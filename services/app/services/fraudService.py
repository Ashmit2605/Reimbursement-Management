"""
fraudService.py
---------------
Business logic for the hybrid fraud-detection system.
Combines an Isolation Forest ML model with rule-based heuristics.

Hybrid score formula:
    final_score = (ml_score * 0.6) + (rule_score * 0.4)

IMPORTANT: Scores are scaled by a history confidence factor.
With very few past expenses, the system leans towards "not suspicious"
because there isn't enough data to make a reliable judgment.
"""

from __future__ import annotations

from typing import Dict, Any, List, Tuple

import numpy as np

from app.schemas.fraudSchema import FraudCheckRequest
from app.services.featureEngineering import FeatureEngineer
from app.services.mlModel import AnomalyDetector


class FraudService:
    """Service class orchestrating ML + rule-based fraud detection."""

    # Weight constants for hybrid scoring
    ML_WEIGHT = 0.6
    RULE_WEIGHT = 0.4

    # Threshold above which an expense is flagged as suspicious
    SUSPICIOUS_THRESHOLD = 0.5

    # Minimum history items needed for each signal type
    MIN_HISTORY_FOR_ML = 5            # Need at least 5 to train meaningful model
    MIN_HISTORY_FOR_CATEGORY = 5      # Need at least 5 before "new category" matters
    MIN_HISTORY_FOR_AMOUNT_RATIO = 3  # Need at least 3 for amount comparison
    MIN_HISTORY_FOR_ZSCORE = 5        # Need at least 5 for z-score analysis

    # Minimum history for full confidence
    FULL_CONFIDENCE_HISTORY = 10      # Below this, scores are scaled down

    def check(self, payload: FraudCheckRequest) -> Dict[str, Any]:
        """
        Run the full fraud-detection pipeline on a single expense.
        """
        current = payload.current_expense
        history = payload.user_history
        history_count = len(history)

        # ── 1. Feature Engineering ─────────────────────────────────────
        feature_engineer = FeatureEngineer()

        history_dicts = [
            {"amount": h.amount, "category": h.category, "date": h.date}
            for h in history
        ]
        training_features, category_map = feature_engineer.build_training_matrix(
            history_dicts
        )

        current_hour = feature_engineer.extract_hour(current.date)
        current_cat_encoded = feature_engineer.encode_category(current.category)
        current_vector = feature_engineer.build_feature_vector(
            current.amount, current_hour, current_cat_encoded
        )

        # ── 2. Calculate history confidence factor ─────────────────────
        # With 1 expense: confidence = 0.1
        # With 5 expenses: confidence = 0.5
        # With 10+ expenses: confidence = 1.0
        history_confidence = min(history_count / self.FULL_CONFIDENCE_HISTORY, 1.0)

        # ── 3. ML Model ───────────────────────────────────────────────
        ml_score = self._compute_ml_score(
            training_features, current_vector, history_count
        )

        # ── 4. Rule-based signals ──────────────────────────────────────
        rule_score, reasons = self._compute_rule_score(
            current_expense=current,
            history=history_dicts,
            feature_engineer=feature_engineer,
            current_hour=current_hour,
            history_count=history_count,
        )

        # ── 5. Apply confidence scaling ────────────────────────────────
        # Scale ML and rule scores by confidence
        # This prevents high scores when we have very little data
        adjusted_ml_score = round(ml_score * history_confidence, 4)
        adjusted_rule_score = round(rule_score * history_confidence, 4)

        # ── 6. Hybrid score ───────────────────────────────────────────
        fraud_score = round(
            (adjusted_ml_score * self.ML_WEIGHT)
            + (adjusted_rule_score * self.RULE_WEIGHT),
            4,
        )
        is_suspicious = fraud_score >= self.SUSPICIOUS_THRESHOLD

        # Add confidence info to reasons if history is small
        if history_count < self.MIN_HISTORY_FOR_ML:
            reasons.append(
                f"Low confidence: only {history_count} historical expense(s) available "
                f"(need {self.FULL_CONFIDENCE_HISTORY}+ for full confidence)"
            )

        return {
            "is_suspicious": is_suspicious,
            "fraud_score": fraud_score,
            "ml_score": adjusted_ml_score,
            "rule_score": adjusted_rule_score,
            "reasons": reasons,
        }

    # ── Private: ML scoring ─────────────────────────────────────────────

    def _compute_ml_score(
        self,
        training_features: np.ndarray,
        current_vector: np.ndarray,
        history_count: int,
    ) -> float:
        """
        Train an Isolation Forest on the user's history and compute an
        anomaly score for the current expense.

        Returns a LOW score (towards 0) when there isn't enough data,
        instead of a neutral 0.5 which could trigger false positives.
        """
        detector = AnomalyDetector(contamination=0.1)

        # Not enough history to train a meaningful model
        if history_count < self.MIN_HISTORY_FOR_ML:
            # Return low score — lean towards "not suspicious" when uncertain
            return 0.2

        try:
            detector.train(training_features)
            _, ml_score = detector.predict_and_score(current_vector)
            return ml_score
        except Exception:
            return 0.2  # Fallback: assume safe on error

    # ── Private: Rule-based scoring ─────────────────────────────────────

    def _compute_rule_score(
        self,
        current_expense: Any,
        history: List[Dict],
        feature_engineer: FeatureEngineer,
        current_hour: int,
        history_count: int,
    ) -> Tuple[float, List[str]]:
        """
        Evaluate rule-based fraud signals.

        IMPORTANT: Each signal has a MINIMUM HISTORY requirement.
        With very few expenses, most signals won't fire because
        there isn't enough data to establish what's "normal."

        Signals:
          A. High amount compared to historical mean (needs 3+ expenses)
          B. New / never-seen category (needs 5+ expenses)
          C. Unusual submission time (always active — no history needed)
        """
        reasons: List[str] = []
        signal_scores: List[float] = []

        amounts = [float(h["amount"]) for h in history]
        mean_amount = float(np.mean(amounts)) if amounts else 0.0
        std_amount = float(np.std(amounts)) if len(amounts) > 1 else 0.0

        # ── Signal A: High amount vs mean ──────────────────────────────
        # Only check when we have enough history to know what's "normal"
        if history_count >= self.MIN_HISTORY_FOR_AMOUNT_RATIO and mean_amount > 0:
            ratio = current_expense.amount / mean_amount

            if ratio > 3.0:
                score_a = min(ratio / 10.0, 1.0)
                signal_scores.append(score_a)
                reasons.append(
                    f"Amount is {ratio:.1f}x higher than historical mean "
                    f"(${mean_amount:,.2f})"
                )
            elif ratio > 2.0:
                score_a = 0.4
                signal_scores.append(score_a)
                reasons.append(
                    f"Amount is {ratio:.1f}x higher than historical mean "
                    f"(${mean_amount:,.2f})"
                )

            # Z-score check — needs even more history for statistical significance
            if (
                std_amount > 0
                and history_count >= self.MIN_HISTORY_FOR_ZSCORE
            ):
                z_score = (current_expense.amount - mean_amount) / std_amount
                if z_score > 3.0:
                    signal_scores.append(min(z_score / 5.0, 1.0))
                    reasons.append(
                        f"Amount is {z_score:.1f} standard deviations above the mean"
                    )

        # ── Signal B: New category ─────────────────────────────────────
        # ONLY flag new categories when user has enough history.
        # With few expenses, it's NORMAL to use new categories.
        history_categories = [h["category"] for h in history]

        if history_count >= self.MIN_HISTORY_FOR_CATEGORY:
            if feature_engineer.is_new_category(
                current_expense.category, history_categories
            ):
                # Scale signal by how many unique categories user already has
                unique_categories = len(set(c.lower() for c in history_categories))

                if unique_categories >= 3:
                    # User has diverse categories already — new one is more suspicious
                    signal_scores.append(0.6)
                    reasons.append(
                        f"Category '{current_expense.category}' has never been used "
                        f"before (user has {unique_categories} known categories)"
                    )
                else:
                    # User has few categories — still building profile
                    signal_scores.append(0.3)
                    reasons.append(
                        f"Category '{current_expense.category}' is new "
                        f"(but user profile is still building — "
                        f"only {unique_categories} categories seen so far)"
                    )

        # ── Signal C: Unusual time ─────────────────────────────────────
        # This signal is always active — doesn't need history
        # Submitting expenses at 3 AM is unusual regardless of history
        if current_hour < 6 or current_hour >= 22:
            signal_scores.append(0.5)
            reasons.append(
                f"Submitted at unusual hour ({current_hour}:00)"
            )
        elif current_hour >= 20:
            signal_scores.append(0.2)
            reasons.append(
                f"Submitted at late hour ({current_hour}:00)"
            )

        # ── Aggregate rule score ───────────────────────────────────────
        if signal_scores:
            rule_score = min(float(np.mean(signal_scores)), 1.0)
        else:
            rule_score = 0.0

        return round(rule_score, 4), reasons
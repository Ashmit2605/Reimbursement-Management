from __future__ import annotations

from typing import Dict, Any, List, Optional

from app.schemas.ruleSchema import (
    RuleEvaluationRequest,
    PercentageRule,
    ApproverRule,
    HybridRule,
    RuleViolation,
)


class RuleService:
    def evaluate(self, payload: RuleEvaluationRequest) -> Dict[str, Any]:
        expense = payload.expense
        rules = payload.rules

        violations: List[RuleViolation] = []
        required_actions: List[str] = []
        total_checked = 0

        # Percentage rules
        for pr in (rules.percentage_rules or []):
            total_checked += 1
            violation = self._evaluate_percentage_rule(expense.amount, pr)
            if violation:
                violations.append(violation)
                required_actions.append(
                    f"Get additional approval — expense is "
                    f"{round(expense.amount / pr.reference_value * 100, 1)}% of reference value."
                )

        # Approver rules
        for ar in (rules.approver_rules or []):
            total_checked += 1
            violation = self._evaluate_approver_rule(expense.amount, expense.category, expense.approver, ar)
            if violation:
                violations.append(violation)
                required_actions.append(f"Reassign approval to '{ar.required_approver}'.")

        # Hybrid rules
        for hr in (rules.hybrid_rules or []):
            total_checked += 1
            violation = self._evaluate_hybrid_rule(expense.amount, expense.category, expense.approver, hr)
            if violation:
                violations.append(violation)
                required_actions.append("Review expense — it violates a hybrid policy rule.")

        is_compliant = len(violations) == 0

        return {
            "is_compliant": is_compliant,
            "violations": [v.model_dump() for v in violations],
            "required_actions": required_actions,
            "total_rules_checked": total_checked,
        }

    @staticmethod
    def _evaluate_percentage_rule(amount: float, rule: PercentageRule) -> Optional[RuleViolation]:
        percentage = (amount / rule.reference_value) * 100
        if percentage >= rule.threshold_percentage:
            severity = "low"
            if percentage >= 100:
                severity = "critical"
            elif percentage >= 90:
                severity = "high"
            elif percentage >= rule.threshold_percentage:
                severity = "medium"

            return RuleViolation(
                rule_type="percentage",
                rule_detail=(
                    f"Expense amount (${amount:,.2f}) is {percentage:.1f}% "
                    f"of reference value (${rule.reference_value:,.2f}), "
                    f"exceeding the {rule.threshold_percentage}% threshold."
                ),
                severity=severity,
            )
        return None

    @staticmethod
    def _evaluate_approver_rule(
        amount: float, category: str, current_approver: Optional[str], rule: ApproverRule
    ) -> Optional[RuleViolation]:
        needs_specific_approver = False
        reason_parts: List[str] = []

        if rule.amount_threshold and amount > rule.amount_threshold:
            needs_specific_approver = True
            reason_parts.append(f"amount (${amount:,.2f}) exceeds threshold (${rule.amount_threshold:,.2f})")

        if rule.categories and category.lower() in [c.lower() for c in rule.categories]:
            needs_specific_approver = True
            reason_parts.append(f"category '{category}' requires specific approval")

        if needs_specific_approver:
            if not current_approver or current_approver.lower() != rule.required_approver.lower():
                severity = "high" if rule.amount_threshold and amount > rule.amount_threshold else "medium"
                return RuleViolation(
                    rule_type="approver",
                    rule_detail=(
                        f"Expense requires approver '{rule.required_approver}' "
                        f"because {' and '.join(reason_parts)}. "
                        f"Current approver: '{current_approver or 'none'}'."
                    ),
                    severity=severity,
                )
        return None

    def _evaluate_hybrid_rule(
        self, amount: float, category: str, current_approver: Optional[str], rule: HybridRule
    ) -> Optional[RuleViolation]:
        sub_violations: List[str] = []

        if rule.percentage_rule:
            pv = self._evaluate_percentage_rule(amount, rule.percentage_rule)
            if pv:
                sub_violations.append(pv.rule_detail)

        if rule.approver_rule:
            av = self._evaluate_approver_rule(amount, category, current_approver, rule.approver_rule)
            if av:
                sub_violations.append(av.rule_detail)

        if rule.percentage_rule and rule.approver_rule:
            if len(sub_violations) == 2:
                return RuleViolation(
                    rule_type="hybrid",
                    rule_detail=f"Hybrid rule violated — {' | '.join(sub_violations)}",
                    severity="critical",
                )
        elif sub_violations:
            return RuleViolation(
                rule_type="hybrid",
                rule_detail=f"Hybrid rule violated — {sub_violations[0]}",
                severity="high",
            )

        return None
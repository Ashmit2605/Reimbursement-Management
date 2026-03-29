from __future__ import annotations

from typing import Optional, Tuple

import numpy as np
from sklearn.ensemble import IsolationForest


class AnomalyDetector:
    def __init__(self, contamination: float = 0.1, random_state: int = 42) -> None:
        self.contamination = contamination
        self.random_state = random_state
        self.model: Optional[IsolationForest] = None
        self._is_trained: bool = False

    def train(self, features: np.ndarray) -> None:
        n_samples = features.shape[0]
        effective_contamination = self.contamination
        if n_samples < 10:
            effective_contamination = min(self.contamination, 0.5)

        self.model = IsolationForest(
            contamination=effective_contamination,
            random_state=self.random_state,
            n_estimators=100,
            max_samples="auto",
        )
        self.model.fit(features)
        self._is_trained = True

    def predict(self, sample: np.ndarray) -> int:
        if not self._is_trained or self.model is None:
            raise RuntimeError("Model has not been trained yet.")
        sample_2d = sample.reshape(1, -1)
        prediction = self.model.predict(sample_2d)
        return int(prediction[0])

    def score(self, sample: np.ndarray) -> float:
        if not self._is_trained or self.model is None:
            raise RuntimeError("Model has not been trained yet.")
        sample_2d = sample.reshape(1, -1)
        raw_score = self.model.decision_function(sample_2d)[0]
        inverted = -raw_score
        normalised = self._sigmoid_normalise(inverted)
        return round(float(normalised), 4)

    def predict_and_score(self, sample: np.ndarray) -> Tuple[int, float]:
        label = self.predict(sample)
        ml_score = self.score(sample)
        return label, ml_score

    @property
    def is_trained(self) -> bool:
        return self._is_trained

    @staticmethod
    def _sigmoid_normalise(x: float) -> float:
        result = 1.0 / (1.0 + np.exp(-x))
        return float(np.clip(result, 0.0, 1.0))
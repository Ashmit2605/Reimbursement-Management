from __future__ import annotations

from typing import List, Dict, Tuple
from datetime import datetime

import numpy as np


class FeatureEngineer:
    def __init__(self) -> None:
        self._category_map: Dict[str, int] = {}
        self._next_category_id: int = 0

    def build_category_map(self, categories: List[str]) -> Dict[str, int]:
        self._category_map = {}
        self._next_category_id = 0
        unique_cats = sorted(set(categories))
        for cat in unique_cats:
            self._category_map[cat.lower()] = self._next_category_id
            self._next_category_id += 1
        return self._category_map

    def encode_category(self, category: str) -> int:
        cat_lower = category.lower()
        if cat_lower not in self._category_map:
            self._category_map[cat_lower] = self._next_category_id
            self._next_category_id += 1
        return self._category_map[cat_lower]

    def extract_hour(self, date_string: str) -> int:
        try:
            dt = datetime.fromisoformat(date_string)
            return dt.hour
        except (ValueError, TypeError):
            return 12

    def build_feature_vector(self, amount: float, hour: int, category_encoded: int) -> np.ndarray:
        return np.array([amount, hour, category_encoded], dtype=np.float64)

    def build_training_matrix(self, expenses: List[Dict]) -> Tuple[np.ndarray, Dict[str, int]]:
        categories = [e["category"] for e in expenses]
        self.build_category_map(categories)

        rows: List[np.ndarray] = []
        for exp in expenses:
            amount = float(exp["amount"])
            hour = self.extract_hour(exp["date"])
            cat_encoded = self.encode_category(exp["category"])
            rows.append(self.build_feature_vector(amount, hour, cat_encoded))

        features = np.vstack(rows) if rows else np.empty((0, 3))
        return features, self._category_map

    def get_category_map(self) -> Dict[str, int]:
        return dict(self._category_map)

    def is_new_category(self, category: str, known_categories: List[str]) -> bool:
        known_lower = {c.lower() for c in known_categories}
        return category.lower() not in known_lower
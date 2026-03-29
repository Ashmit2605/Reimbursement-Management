from __future__ import annotations

import re
import io
from typing import Dict, Any, Optional, List

from PIL import Image
import pytesseract


class OcrService:
    CATEGORY_KEYWORDS: Dict[str, List[str]] = {
        "Food & Dining": [
            "restaurant", "cafe", "coffee", "food", "pizza", "burger",
            "sushi", "diner", "bistro", "grill", "bakery", "bar",
            "meal", "lunch", "dinner", "breakfast", "starbucks", "mcdonalds",
        ],
        "Transport": [
            "uber", "lyft", "taxi", "cab", "fuel", "gas", "petrol",
            "parking", "toll", "airline", "flight", "train", "bus", "metro",
        ],
        "Office Supplies": [
            "staples", "office", "paper", "pen", "ink", "toner",
            "printer", "supplies", "stationery",
        ],
        "Travel": [
            "hotel", "motel", "airbnb", "booking", "lodge", "inn",
            "resort", "travel", "trip", "accommodation",
        ],
        "Electronics": [
            "apple", "samsung", "laptop", "phone", "tablet", "computer",
            "monitor", "keyboard", "mouse", "cable", "charger",
        ],
        "Entertainment": [
            "movie", "cinema", "theatre", "concert", "ticket",
            "event", "museum", "netflix", "spotify",
        ],
        "Healthcare": [
            "pharmacy", "hospital", "clinic", "doctor", "medical",
            "health", "medicine", "prescription", "dental",
        ],
        "Utilities": [
            "electric", "water", "internet", "phone", "bill",
            "utility", "broadband",
        ],
    }

    def extract_expense_data(self, image_bytes: bytes) -> Dict[str, Any]:
        image = Image.open(io.BytesIO(image_bytes))
        raw_text: str = pytesseract.image_to_string(image)

        try:
            ocr_data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
            confidences = [
                int(c) for c in ocr_data.get("conf", [])
                if str(c).isdigit() and int(c) > 0
            ]
            avg_confidence = round(sum(confidences) / len(confidences) / 100, 2) if confidences else 0.0
        except Exception:
            avg_confidence = 0.0

        amount = self._extract_amount(raw_text)
        date = self._extract_date(raw_text)
        vendor = self._extract_vendor(raw_text)
        category = self._detect_category(raw_text)

        return {
            "raw_text": raw_text.strip(),
            "amount": amount,
            "date": date,
            "vendor": vendor,
            "category": category,
            "confidence": avg_confidence,
        }

    def _extract_amount(self, text: str) -> Optional[float]:
        patterns = [
            r'(?i)(?:total|amount|sum|grand\s*total|balance\s*due)\s*[:=]?\s*\$?\s*([\d,]+\.?\d{0,2})',
            r'\$\s*([\d,]+\.?\d{0,2})',
            r'(\d{1,3}(?:,\d{3})*\.\d{2})\b',
        ]
        amounts: List[float] = []
        for pattern in patterns:
            matches = re.findall(pattern, text)
            for match in matches:
                try:
                    value = float(match.replace(",", ""))
                    if value > 0:
                        amounts.append(value)
                except ValueError:
                    continue
        return max(amounts) if amounts else None

    def _extract_date(self, text: str) -> Optional[str]:
        patterns = [
            r'(\d{4}[-/]\d{1,2}[-/]\d{1,2})',
            r'(\d{1,2}[-/]\d{1,2}[-/]\d{4})',
            r'(\d{1,2}[-/]\d{1,2}[-/]\d{2})\b',
            r'([A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4})',
            r'(\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4})',
        ]
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(1).strip()
        return None

    def _extract_vendor(self, text: str) -> Optional[str]:
        lines = [line.strip() for line in text.split("\n") if line.strip() and len(line.strip()) > 2]
        if not lines:
            return None
        for line in lines[:3]:
            if re.match(r'^[\d\s\-/.$,:%]+$', line):
                continue
            if re.match(r'(?i)^(receipt|invoice|bill|order|transaction|date|time)', line):
                continue
            vendor = re.sub(r'\s+', ' ', line).strip()
            if len(vendor) >= 2:
                return vendor
        return lines[0] if lines else None

    def _detect_category(self, text: str) -> Optional[str]:
        text_lower = text.lower()
        scores: Dict[str, int] = {}
        for category, keywords in self.CATEGORY_KEYWORDS.items():
            score = sum(1 for kw in keywords if kw in text_lower)
            if score > 0:
                scores[category] = score
        if scores:
            return max(scores, key=lambda k: scores[k])
        return "General"
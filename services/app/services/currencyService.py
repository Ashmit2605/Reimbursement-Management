from __future__ import annotations

from typing import Dict, Any

import requests


class CurrencyService:
    BASE_URL = "https://open.er-api.com/v6/latest"

    FALLBACK_RATES: Dict[str, float] = {
        "USD": 1.0, "EUR": 0.92, "GBP": 0.79, "INR": 83.12,
        "JPY": 149.50, "CAD": 1.36, "AUD": 1.53, "CHF": 0.88,
        "CNY": 7.24, "SGD": 1.34,
    }

    def convert(self, amount: float, from_currency: str, to_currency: str) -> Dict[str, Any]:
        if from_currency == to_currency:
            return {
                "original_amount": amount,
                "from_currency": from_currency,
                "to_currency": to_currency,
                "exchange_rate": 1.0,
                "converted_amount": round(amount, 2),
            }

        rate = self._fetch_rate(from_currency, to_currency)
        converted = round(amount * rate, 2)

        return {
            "original_amount": amount,
            "from_currency": from_currency,
            "to_currency": to_currency,
            "exchange_rate": round(rate, 6),
            "converted_amount": converted,
        }

    def _fetch_rate(self, from_currency: str, to_currency: str) -> float:
        try:
            url = f"{self.BASE_URL}/{from_currency}"
            response = requests.get(url, timeout=10)

            if response.status_code != 200:
                raise ConnectionError(f"API returned status {response.status_code}")

            data = response.json()
            if data.get("result") != "success":
                raise ConnectionError(f"API error: {data.get('error-type', 'unknown')}")

            rates = data.get("rates", {})
            if to_currency not in rates:
                raise ValueError(f"Unsupported target currency: {to_currency}")

            return float(rates[to_currency])

        except requests.exceptions.RequestException:
            return self._fallback_rate(from_currency, to_currency)

    def _fallback_rate(self, from_currency: str, to_currency: str) -> float:
        if from_currency not in self.FALLBACK_RATES:
            raise ValueError(f"Unsupported source currency: {from_currency}")
        if to_currency not in self.FALLBACK_RATES:
            raise ValueError(f"Unsupported target currency: {to_currency}")
        return self.FALLBACK_RATES[to_currency] / self.FALLBACK_RATES[from_currency]
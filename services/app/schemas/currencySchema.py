from __future__ import annotations

from pydantic import BaseModel, Field


class CurrencyConvertData(BaseModel):
    original_amount: float = Field(..., description="Original amount")
    from_currency: str = Field(..., description="Source currency code")
    to_currency: str = Field(..., description="Target currency code")
    exchange_rate: float = Field(..., description="Exchange rate used")
    converted_amount: float = Field(..., description="Converted amount")


class CurrencyConvertResponse(BaseModel):
    success: bool
    message: str
    data: CurrencyConvertData
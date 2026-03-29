from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel, Field


class HistoryExpense(BaseModel):
    amount: float
    category: str
    date: str


class CurrentExpense(BaseModel):
    amount: float = Field(..., gt=0)
    category: str
    date: str
    vendor: Optional[str] = None
    description: Optional[str] = None


class FraudCheckRequest(BaseModel):
    current_expense: CurrentExpense
    user_history: List[HistoryExpense] = Field(..., min_length=1)


class FraudCheckData(BaseModel):
    is_suspicious: bool
    fraud_score: float = Field(..., ge=0, le=1)
    ml_score: float = Field(..., ge=0, le=1)
    rule_score: float = Field(..., ge=0, le=1)
    reasons: List[str] = Field(default_factory=list)


class FraudCheckResponse(BaseModel):
    success: bool
    message: str
    data: FraudCheckData
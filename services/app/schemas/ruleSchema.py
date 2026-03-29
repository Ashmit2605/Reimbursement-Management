from __future__ import annotations

from typing import List, Optional
from pydantic import BaseModel, Field


class PercentageRule(BaseModel):
    threshold_percentage: float = Field(..., gt=0, le=100)
    reference_value: float = Field(..., gt=0)


class ApproverRule(BaseModel):
    required_approver: str = Field(..., min_length=1)
    amount_threshold: Optional[float] = Field(None, gt=0)
    categories: Optional[List[str]] = None


class HybridRule(BaseModel):
    percentage_rule: Optional[PercentageRule] = None
    approver_rule: Optional[ApproverRule] = None


class RuleSet(BaseModel):
    percentage_rules: Optional[List[PercentageRule]] = Field(default_factory=list)
    approver_rules: Optional[List[ApproverRule]] = Field(default_factory=list)
    hybrid_rules: Optional[List[HybridRule]] = Field(default_factory=list)


class ExpenseData(BaseModel):
    amount: float = Field(..., gt=0)
    category: str = Field(..., min_length=1)
    submitter: Optional[str] = None
    approver: Optional[str] = None
    description: Optional[str] = None


class RuleEvaluationRequest(BaseModel):
    expense: ExpenseData
    rules: RuleSet


class RuleViolation(BaseModel):
    rule_type: str
    rule_detail: str
    severity: str


class RuleEvaluationData(BaseModel):
    is_compliant: bool
    violations: List[RuleViolation] = Field(default_factory=list)
    required_actions: List[str] = Field(default_factory=list)
    total_rules_checked: int


class RuleEvaluationResponse(BaseModel):
    success: bool
    message: str
    data: RuleEvaluationData
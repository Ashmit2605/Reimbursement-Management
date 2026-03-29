from __future__ import annotations

from fastapi import HTTPException
from app.services.ruleService import RuleService
from app.schemas.ruleSchema import RuleEvaluationRequest, RuleEvaluationResponse

rule_service = RuleService()


async def evaluate_rules(payload: RuleEvaluationRequest) -> RuleEvaluationResponse:
    try:
        result = rule_service.evaluate(payload)
        return RuleEvaluationResponse(
            success=True,
            message="Rule evaluation completed.",
            data=result,
        )
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Rule evaluation failed: {str(exc)}")
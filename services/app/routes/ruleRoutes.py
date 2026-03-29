from fastapi import APIRouter
from app.controllers.ruleController import evaluate_rules
from app.schemas.ruleSchema import RuleEvaluationRequest, RuleEvaluationResponse

router = APIRouter()


@router.post("/evaluate", response_model=RuleEvaluationResponse, summary="Evaluate expense rules")
async def rules_evaluate(payload: RuleEvaluationRequest):
    return await evaluate_rules(payload)
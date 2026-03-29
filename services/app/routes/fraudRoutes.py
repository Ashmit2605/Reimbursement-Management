from fastapi import APIRouter
from app.controllers.fraudController import check_fraud
from app.schemas.fraudSchema import FraudCheckRequest, FraudCheckResponse

router = APIRouter()


@router.post("/check", response_model=FraudCheckResponse, summary="Check expense for fraud")
async def fraud_check(payload: FraudCheckRequest):
    return await check_fraud(payload)
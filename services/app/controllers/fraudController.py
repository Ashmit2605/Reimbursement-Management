from __future__ import annotations

from fastapi import HTTPException
from app.services.fraudService import FraudService
from app.schemas.fraudSchema import FraudCheckRequest, FraudCheckResponse

fraud_service = FraudService()


async def check_fraud(payload: FraudCheckRequest) -> FraudCheckResponse:
    try:
        result = fraud_service.check(payload)
        return FraudCheckResponse(
            success=True,
            message="Fraud check completed.",
            data=result,
        )
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Fraud check failed: {str(exc)}")
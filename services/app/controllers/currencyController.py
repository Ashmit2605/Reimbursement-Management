from __future__ import annotations

from fastapi import HTTPException
from app.services.currencyService import CurrencyService
from app.schemas.currencySchema import CurrencyConvertResponse

currency_service = CurrencyService()


async def convert_currency(
    amount: float, from_currency: str, to_currency: str
) -> CurrencyConvertResponse:
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive.")

    if not from_currency or not to_currency:
        raise HTTPException(status_code=400, detail="Both 'from' and 'to' currency codes are required.")

    from_currency = from_currency.upper().strip()
    to_currency = to_currency.upper().strip()

    if len(from_currency) != 3 or len(to_currency) != 3:
        raise HTTPException(status_code=400, detail="Currency codes must be 3-letter ISO 4217 codes.")

    try:
        result = currency_service.convert(amount, from_currency, to_currency)
        return CurrencyConvertResponse(
            success=True,
            message="Currency conversion successful.",
            data=result,
        )
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except ConnectionError as ce:
        raise HTTPException(status_code=502, detail=str(ce))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Currency conversion failed: {str(exc)}")
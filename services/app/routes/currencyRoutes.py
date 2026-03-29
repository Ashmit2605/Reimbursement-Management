from fastapi import APIRouter, Query
from app.controllers.currencyController import convert_currency
from app.schemas.currencySchema import CurrencyConvertResponse

router = APIRouter()


@router.get("/convert", response_model=CurrencyConvertResponse, summary="Convert currency")
async def currency_convert(
    amount: float = Query(..., gt=0, description="Amount to convert"),
    from_currency: str = Query(..., alias="from", min_length=3, max_length=3, description="Source currency"),
    to: str = Query(..., min_length=3, max_length=3, description="Target currency"),
):
    return await convert_currency(amount, from_currency, to)
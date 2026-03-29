"""
main.py
-------
Entry point for the Smart Expense Processing FastAPI microservice.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.ocrRoutes import router as ocr_router
from app.routes.currencyRoutes import router as currency_router
from app.routes.ruleRoutes import router as rule_router
from app.routes.fraudRoutes import router as fraud_router

app = FastAPI(
    title="Smart Expense Processing Service",
    description=(
        "A Python FastAPI microservice that provides OCR receipt extraction, "
        "currency conversion, rule-based policy evaluation, and ML-powered "
        "fraud detection for expense reports."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ocr_router, prefix="/ocr", tags=["OCR"])
app.include_router(currency_router, prefix="/currency", tags=["Currency"])
app.include_router(rule_router, prefix="/rules", tags=["Rule Engine"])
app.include_router(fraud_router, prefix="/fraud", tags=["Fraud Detection"])


@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "service": "Smart Expense Processing Service",
        "version": "1.0.0",
    }


@app.get("/health", tags=["Health"])
async def health():
    return {
        "status": "healthy",
        "service": "smart-expense-processing-service",
        "version": "1.0.0",
        "endpoints": [
            "/ocr/extract",
            "/currency/convert",
            "/rules/evaluate",
            "/fraud/check",
        ],
    }
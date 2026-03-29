from __future__ import annotations

from typing import Optional
from pydantic import BaseModel, Field


class OcrExtractedData(BaseModel):
    raw_text: str = Field(..., description="Full raw text extracted by Tesseract")
    amount: Optional[float] = Field(None, description="Detected monetary amount")
    date: Optional[str] = Field(None, description="Detected date string")
    vendor: Optional[str] = Field(None, description="Detected vendor / merchant name")
    category: Optional[str] = Field(None, description="Auto-detected expense category")
    confidence: Optional[float] = Field(None, description="Extraction confidence 0-1")


class OcrResponse(BaseModel):
    success: bool
    message: str
    data: OcrExtractedData
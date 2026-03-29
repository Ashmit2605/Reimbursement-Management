from __future__ import annotations

from fastapi import UploadFile, HTTPException
from app.services.ocrService import OcrService
from app.schemas.ocrSchema import OcrResponse

ocr_service = OcrService()


async def extract_text_from_image(file: UploadFile) -> OcrResponse:
    allowed_types = [
        "image/png", "image/jpeg", "image/jpg",
        "image/tiff", "image/bmp", "image/webp",
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file.content_type}. Allowed: {', '.join(allowed_types)}",
        )

    try:
        image_bytes = await file.read()
        if not image_bytes:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        result = ocr_service.extract_expense_data(image_bytes)

        return OcrResponse(
            success=True,
            message="OCR extraction completed successfully.",
            data=result,
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(exc)}")
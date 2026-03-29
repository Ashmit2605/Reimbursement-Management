from fastapi import APIRouter, UploadFile, File, Request
from app.controllers.ocrController import extract_text_from_image
from app.schemas.ocrSchema import OcrResponse

router = APIRouter()


# ── Debug endpoint — shows what the server receives ─────────────
@router.post("/debug")
async def ocr_debug(request: Request):
    """Debug endpoint to see what Postman is actually sending."""
    content_type = request.headers.get("content-type", "NOT SET")
    body = await request.body()
    
    return {
        "content_type_header": content_type,
        "body_length": len(body),
        "body_preview": body[:200].decode("utf-8", errors="replace"),
        "all_headers": dict(request.headers),
        "help": {
            "fix_1": "Content-Type should contain 'multipart/form-data'",
            "fix_2": "Body should NOT be empty",
            "fix_3": "Make sure key type is 'File' not 'Text' in Postman",
        }
    }


# ── Main OCR endpoint ──────────────────────────────────────────
@router.post(
    "/extract",
    response_model=OcrResponse,
    summary="Extract expense data from receipt image",
)
async def ocr_extract(
    file: UploadFile = File(..., description="Receipt image file"),
):
    return await extract_text_from_image(file)
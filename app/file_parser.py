from app.logger import get_logger
import pdfplumber 

logger = get_logger(__name__)

def extract_pdf_text(file_path):
    full_text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += f"{text}\n"
        return full_text.strip()
    except Exception as e: 
        logger.exception(f"An exception occurred while parsing PDF file: {e}") 
        return "" 


def get_pdf_stats(file_path):
    try:
        with pdfplumber.open(file_path) as pdf:
            char_count = 0
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    char_count += len(text)
            return {
                "char_count": char_count, 
                "pages": len(pdf.pages),
                "approx_tokens": char_count // 4
            }
    except Exception as e:
        logger.exception(f"An exception occurred while fetching PDF stats: {e}")
        return {
            "char_count": 0, 
            "pages": 0,
            "approx_tokens": 0
        }

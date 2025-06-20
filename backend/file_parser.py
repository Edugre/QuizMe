from backend.logger import get_logger
import pdfplumber 

logger = get_logger(__name__)

def extract_pdf_text(file_path):
    full_text = "" 
    try: 
        with pdfplumber.open(file_path) as pdf: # Open PDF file 
            for page in pdf.pages: # Extract text from each page  
                text = page.extract_text()
                if text:
                    full_text += f"{text}\n" # Append page text
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
                    char_count += len(text) # Add character count from each page 
            return { 
                "char_count": char_count, 
                "pages": len(pdf.pages),
                "approx_tokens": char_count // 4 # Rough estimate 1 token = 4 chars
            }
    except Exception as e:
        logger.exception(f"An exception occurred while fetching PDF stats: {e}") 
        return {
            "char_count": 0, 
            "pages": 0,
            "approx_tokens": 0
        }
    
def clean_study_text(text):
    lines = text.splitlines() 
    cleaned_lines = [line.strip() for line in lines if line.strip()]
    return "\n".join(cleaned_lines)

from backend.file_parser import extract_pdf_text, get_pdf_stats
from backend.logger import get_logger 

logger = get_logger(__name__)

def test_pdf_functions():
    sample_pdf_path = "/Users/eduardogoncalvez/Desktop/Mid Term Sociology Review.pdf"
    text = extract_pdf_text(sample_pdf_path)
    stats = get_pdf_stats(sample_pdf_path)

    logger.info("Extracted Text:")
    logger.info(text)
    logger.info("PDF Stats:")
    logger.info(stats)

if __name__ == "__main__":
    test_pdf_functions()

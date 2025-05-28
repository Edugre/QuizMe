from app.quiz_generator import generate_quiz
from app.file_parser import extract_pdf_text, get_pdf_stats
from app.logger import get_logger

logger = get_logger(__name__)

def test_quiz_generation():
    try: 
        sample_path = "/Users/eduardogoncalvez/Desktop/Mid Term Sociology Review.pdf"
        text = extract_pdf_text(sample_path)
        quiz = generate_quiz(text, "medium")
        if (quiz):
            logger.info(quiz)
        else: 
            logger.warning("Quiz generation returned an empty response")
    except Exception as e:
        logger.exception(f"Failed to generate quiz: {e}")

if __name__ == "__main__":
    test_quiz_generation()
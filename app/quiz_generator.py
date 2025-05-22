from app.logger import get_logger
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()
logger = get_logger(__name__)

def load_prompt(difficulty):
    try: 
        with open(f"app/prompts/{difficulty}.txt", "r") as file:
            return file.read()
    except Exception as e: 
        logger.exception(f"Failed to load prompt template while generating quiz: {e}")
        return "" 

def generate_quiz(study_content, difficulty="medium"):
    try:
        prompt_template = load_prompt(difficulty)

        logger.debug(f"Calling OpenAI API with difficulty: {difficulty}")
        logger.debug(f"Prompt template length: {len(prompt_template)}")
        logger.debug(f"Study content length: {len(study_content)}")

        if not study_content or not prompt_template:
            logger.warning("Missing study content or prompt template, skipping call...")
            return ""

        client = OpenAI()
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": prompt_template},
                {"role": "user", "content": study_content}
            ],
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e: 
        logger.exception(f"An exception occurred while generating quiz with LLM: {e}")
        return ""

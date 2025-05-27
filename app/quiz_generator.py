from app.logger import get_logger
from dotenv import load_dotenv
import json
from openai import OpenAI
import os

load_dotenv() # Load environment variables (OpenAI API Key)
logger = get_logger(__name__)

def load_prompt(difficulty): 
    try: 
        # Load prompt template based on chosen difficulty
        with open(f"app/prompts/{difficulty}.txt", "r") as file: 
            return file.read()
    except Exception as e: 
        logger.exception(f"Failed to load prompt template while generating quiz: {e}")
        return "" 

def generate_quiz(study_content, difficulty="medium"):
    try:
        prompt_template = load_prompt(difficulty) # Load the appropiate prompt template

        logger.debug(f"Calling OpenAI API with difficulty: {difficulty}")
        logger.debug(f"Prompt template length: {len(prompt_template)}")
        logger.debug(f"Study content length: {len(study_content)}")

        if not study_content or not prompt_template:
            logger.warning("Missing study content or prompt template, skipping call...")
            return ""

        client = OpenAI() # Intialize OpenAI Client 
        # Send study content and prompt to OpenAI for quiz generation
        response = client.chat.completions.create( 
            model="gpt-4o",
            messages=[
                {"role": "system", "content": prompt_template},
                {"role": "user", "content": study_content}
            ],
            temperature=0.7
        )
        raw_quiz = response.choices[0].message.content.strip()
        logger.info(raw_quiz)

        try:
            quiz_data = json.loads(raw_quiz)
            return quiz_data
        except Exception as e:
            logger.warning("Quiz output was not valid JSON.")
            return []

    except Exception as e: 
        logger.exception(f"An exception occurred while generating quiz with LLM: {e}")
        return ""

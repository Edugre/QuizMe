from flask import Blueprint, request, jsonify, render_template
from app.file_parser import extract_pdf_text, get_pdf_stats, clean_study_text
from app.quiz_generator import generate_quiz
import os 
import tempfile

template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'templates'))

bp = Blueprint('routes', __name__, template_folder=template_dir)

@bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@bp.route('/generate', methods=['POST'])
def generate():
    difficulty = request.form.get("difficulty", "medium")
    study_text = request.form.get("study_text", "")
    quiz = ""

    # Handle uploaded PDF if provided
    if "pdf" in request.files and request.files["pdf"].filename:
        file = request.files["pdf"]
        # Save uploaded PDF to temporary file and pass path to extract_pdf_text
        with tempfile.NamedTemporaryFile(delete=False) as temp_pdf:
            file.save(temp_pdf.name)
            study_text = extract_pdf_text(temp_pdf.name)
            os.unlink(temp_pdf.name) # delete temp file
    
    if not study_text:
        return render_template("error.html", message="No study guide provided.")
    
    cleaned_text = clean_study_text(study_text)
    quiz = generate_quiz(cleaned_text, difficulty)

    return render_template("quiz.html", quiz=quiz, difficulty=difficulty)
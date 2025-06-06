from flask import Blueprint, request, jsonify
from backend.file_parser import extract_pdf_text, get_pdf_stats, clean_study_text
from backend.quiz_generator import generate_quiz
import os 
import tempfile

bp = Blueprint('routes', __name__)

@bp.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    difficulty = request.form.get("difficulty", "medium")
    study_text = request.form.get("study_text", "")

    # Handle uploaded PDF if provided
    if "pdf" in request.files and request.files["pdf"].filename:
        file = request.files["pdf"]
        # Save uploaded PDF to temporary file and pass path to extract_pdf_text
        with tempfile.NamedTemporaryFile(delete=False) as temp_pdf:
            file.save(temp_pdf.name)
            study_text = extract_pdf_text(temp_pdf.name)
            os.unlink(temp_pdf.name) # delete temp file
    
    if not study_text:
        return jsonify({"error": "No study guide provided"})
    
    cleaned_text = clean_study_text(study_text)
    quiz_data = generate_quiz(cleaned_text, difficulty)

    return jsonify({"quiz": quiz_data, "difficulty": difficulty})

@bp.route('/parse-pdf', methods=['POST'])
def parse_pdf():
    if "pdf" not in request.files or request.files["pdf"].filename == "":
        return jsonify({"error": "No PDF file uploaded"}), 400

    file = request.files["pdf"]

    if file.mimetype != 'application/pdf':
        return jsonify({"error": "Uploaded file is not a PDF"}), 400

    with tempfile.NamedTemporaryFile(delete=False) as temp_pdf:
        file.save(temp_pdf.name)
        study_text = extract_pdf_text(temp_pdf.name)
        os.unlink(temp_pdf.name)
    
    cleaned_text = clean_study_text(study_text)
    stats = get_pdf_stats(cleaned_text)

    return jsonify({"text": cleaned_text, "stats": stats})
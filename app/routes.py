from flask import Blueprint, request, jsonify

bp = Blueprint('routes', __name__)

@bp.route('/', methods=['GET'])
def index():
    return "QuizMe is running!"
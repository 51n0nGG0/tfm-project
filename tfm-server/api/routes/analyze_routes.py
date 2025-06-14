from flask import Blueprint, request, jsonify
from controllers.analyze_controller import start_analysis

analyze_bp = Blueprint('analyze', __name__)

@analyze_bp.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    message = data.get('message')
    client_id = data.get('client_id')

    if not client_id or not message:
        return jsonify({"error": "Missing client_id or message"}), 400

    start_analysis(message, client_id)
    return jsonify({"status": "started"})
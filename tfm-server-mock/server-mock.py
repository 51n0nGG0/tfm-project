import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route("/mockResponse", methods=["GET"])
def mock_response():
    file_path = os.path.join(os.path.dirname(__file__), "mocks", "mock-response.json")
    
    with open(file_path, "r") as f:
        data = json.load(f)

    return jsonify(data)

@app.route("/mockMessage", methods=["GET"])
def mock_message():
    file_path = os.path.join(os.path.dirname(__file__), "mocks", "message-mock.json")
    
    with open(file_path, "r") as f:
        data = json.load(f)

    return jsonify(data)

if __name__ == "__main__":
    CORS(app)
    app.run(port=5000)
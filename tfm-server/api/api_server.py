from flask import Flask
from flask_cors import CORS
from routes.analyze_routes import analyze_bp
import sys
import os

sys.stdout.reconfigure(line_buffering=True)
os.environ["PYTHONUNBUFFERED"] = "1"
app = Flask(__name__)
app.register_blueprint(analyze_bp)
CORS(app, origins=["https://localhost:3000"])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

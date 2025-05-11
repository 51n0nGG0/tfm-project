
from flask import Flask, request, jsonify
import redis
import time
import threading
import uuid
import json
import os

app = Flask(__name__)
redis_client = redis.Redis(host=os.getenv("REDIS_HOST", "localhost"), port=6379, db=0)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    message = data.get('message')
    client_id = data.get('client_id')

    if not client_id or not message:
        return jsonify({"error": "Missing client_id or message"}), 400
    
    def background_task(message, client_id):
        for i in range(1, 6):
            time.sleep(1)
            progress = {"status": "in_progress", "progress": i * 20}
            redis_client.publish('analyze_updates', json.dumps({
                "client_id": client_id,
                "payload": progress
            }))
        result = {"status": "completed", "result": f"Analyzed: {message}"}
        redis_client.publish('analyze_updates', json.dumps({
            "client_id": client_id,
            "payload": result
        }))

    threading.Thread(target=background_task, args=(message, client_id), daemon=True).start()
    return jsonify({"status": "started"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


from flask import Flask, request
from flask_socketio import SocketIO, emit
import redis
import threading
import json
import os

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

redis_client = redis.Redis(host=os.getenv("REDIS_HOST", "localhost"), port=6379, db=0)
pubsub = redis_client.pubsub()
pubsub.subscribe('analyze_updates')

client_sockets = {}

@app.route('/')
def index():
    return "WebSocket Server Running"

@socketio.on('connect')
def handle_connect():
    client_id = request.args.get('client_id')
    if client_id:
        client_sockets[client_id] = request.sid
        print(f"Client connected: {client_id} -> {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    for cid, sid in list(client_sockets.items()):
        if sid == request.sid:
            print(f"Client disconnected: {cid}")
            del client_sockets[cid]
            break

def redis_listener():
    for message in pubsub.listen():
        if message['type'] == 'message':
            try:
                data = json.loads(message['data'])
                client_id = data.get('client_id')
                payload = data.get('payload')
                if client_id in client_sockets:
                    socketio.emit('analysis_update', payload, room=client_sockets[client_id])
            except Exception as e:
                print("Error processing message:", e)

threading.Thread(target=redis_listener, daemon=True).start()

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001)

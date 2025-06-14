import eventlet
eventlet.monkey_patch()

from flask import Flask, request
from flask_socketio import SocketIO, emit
import redis
import json
import os

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", ping_timeout=300000, debug=True)

redis_client = redis.Redis(host=os.getenv("REDIS_HOST", "localhost"), port=6379, db=0)
pubsub = redis_client.pubsub()
pubsub.subscribe('analyze_updates')

clients = []

@app.route('/')
def index():
    return "WebSocket Server Running"

@socketio.on('connect')
def handle_connect():
    clients.append(request.sid)
    print(f"[CONNECT] Cliente conectado con SID: {request.sid}")

@socketio.on('disconnect')
def handle_disconnect():
    clients.remove(request.sid)
    print(f"[DISCONNECT] Cliente desconectado con SID: {request.sid}")

def redis_listener():
    print("[REDIS] Listener iniciado")
    for message in pubsub.listen():
        if message['type'] == 'message':
            try:
                data = json.loads(message['data'])
                client_id = data.get('client_id')
                status = data.get('status')
                payload = data.get('payload')
                print(payload)
                if client_id in clients:
                    print(f"[EMIT] Emitiendo mensaje a {client_id}")
                    socketio.emit(f'analysis_{status}', payload, to=client_id)
            except Exception as e:
                print("Error procesando mensaje Redis:", e)

# Lanzar tarea en segundo plano con soporte Eventlet
socketio.start_background_task(target=redis_listener)

if __name__ == '__main__':
    print("[APP] Iniciando servidor WebSocket en el puerto 5001...")
    socketio.run(app, host='0.0.0.0', port=5001)
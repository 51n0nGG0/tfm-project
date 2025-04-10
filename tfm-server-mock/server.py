import asyncio
import websockets
import json
import threading
from flask import Flask, request

# Almacenamos los clientes WebSocket conectados
connected_clients = set()

# Flask API
app = Flask(__name__)

# Simulador del análisis
async def fake_analysis():
    steps = [
        "EXTRACTION",
        "HEADER_ANALYSIS",
        "SEMANTIC_ANALYSIS",
        "ATTACHMENT_SCAN",
        "FINAL_REPORT"
    ]
    for step in steps:
        await asyncio.sleep(1)  # simula trabajo
        message = json.dumps({"step": step})
        await broadcast(message)

# Enviar mensaje a todos los WebSocket conectados
async def broadcast(message):
    if connected_clients:
        await asyncio.gather(*(client.send(message) for client in connected_clients))

# WebSocket handler
async def websocket_handler(websocket):
    connected_clients.add(websocket)
    try:
        async for _ in websocket:
            pass  # no esperamos mensajes entrantes por ahora
    finally:
        connected_clients.remove(websocket)

# Arrancar WebSocket en un hilo separado con loop manual
def start_websocket_server():
    async def run_ws():
        async with websockets.serve(websocket_handler, "localhost", 8765):
            print("Servidor WebSocket activo en ws://localhost:8765")
            await asyncio.Future()  # run forever

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(run_ws())

# Endpoint que dispara el análisis
@app.route("/start", methods=["POST"])
def start_analysis():
    asyncio.run(fake_analysis())  # lanza el análisis en el event loop principal
    return {"status": "analysis started"}

# Lanzar ambos servidores
if __name__ == "__main__":
    # Lanzamos WebSocket en segundo plano
    threading.Thread(target=start_websocket_server, daemon=True).start()
    
    # Flask se queda en primer plano
    app.run(port=5000)
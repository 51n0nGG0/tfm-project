import re
import requests

# Idealmente, esto debería ir en una configuración externa o .env
MODEL = "dolphin-mistral:latest"
OLLAMA_API = "http://host.docker.internal:11434/api/chat"
HEADERS = {"Content-Type": "application/json"}

def analyze_with_llm(text, instruction, pattern):
    messages = [{"role": "user", "content": instruction.replace("{TEXT}", text)}]

    payload = {
        "model": MODEL,
        "messages": messages,
        "stream": False
    }
    
    response = requests.post(OLLAMA_API, json=payload, headers=HEADERS)
    content = response.json().get("message", {}).get("content", "")

    matches = re.findall(pattern, content.upper())
    return matches[-1] if matches else "No se encontró ninguna coincidencia."
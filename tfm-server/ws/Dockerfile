FROM python:3.10

WORKDIR /app
COPY . /app

RUN pip install flask flask-socketio redis eventlet

ENV FLASK_ENV=development

CMD ["python", "-u", "ws_server.py"]

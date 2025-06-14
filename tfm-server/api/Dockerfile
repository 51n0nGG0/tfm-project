
FROM python:3.10

WORKDIR /app
COPY . /app

RUN pip install flask flask-cors redis eventlet spacy langdetect nltk requests

RUN python -m nltk.downloader stopwords punkt
RUN python -m spacy download en_core_web_sm
RUN python -m spacy download es_core_news_sm

ENV FLASK_ENV=development

CMD ["python", "-u", "api_server.py"]

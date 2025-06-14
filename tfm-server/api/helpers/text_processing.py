import spacy
from langdetect import detect
from nltk.tokenize.texttiling import TextTilingTokenizer

# Carga de modelos spaCy solo una vez
nlp_en = spacy.load("en_core_web_sm")
nlp_es = spacy.load("es_core_news_sm")

def clean_text(text: str) -> str:
    return " ".join(text.split())

def detect_language(text: str) -> str:
    return detect(text)

def tokenize_and_segment(text: str) -> list[str]:
    clean = clean_text(text)
    lang = detect_language(clean)

    nlp = nlp_es if lang == "es" else nlp_en
    tokens = [span.text for span in nlp(clean)]

    if len(tokens) < 100:
        return [" ".join(tokens)]

    tokenized_for_tiling = "\n\n".join(tokens)
    return TextTilingTokenizer().tokenize(tokenized_for_tiling)
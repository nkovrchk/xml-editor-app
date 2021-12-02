import string
import re

from nltk import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer


def remove_punctuation(text):
    return "".join([ch if ch not in string.punctuation else ' ' for ch in text])


def remove_numbers(text):
    return ''.join([i if not i.isdigit() else ' ' for i in text])


def remove_multiple_spaces(text):
    return re.sub(r'\s+', ' ', text, flags=re.I)


def prepare_text(text: str) -> str:
    stemmer = SnowballStemmer("russian")
    russian_stopwords = stopwords.words("russian")  # сет русских стоп-слов
    russian_stopwords.extend(['…', '«', '»', '...', 'т.д.', 'т', 'д'])

    cleared_text = remove_multiple_spaces(remove_numbers(remove_punctuation(text.lower())))

    tokens = word_tokenize(cleared_text)
    tokens = [token for token in tokens if token not in russian_stopwords and token != ' ']
    tokenized_text = " ".join(tokens)

    tokens = word_tokenize(tokenized_text)
    stemmed_tokens = [stemmer.stem(token) for token in tokens if token not in russian_stopwords]
    stemmed_text = " ".join(stemmed_tokens)

    return stemmed_text

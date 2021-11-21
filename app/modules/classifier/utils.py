from pymystem3 import Mystem


# Обработка текста после предобработки
# лемматизация текста
def lemmatize (text, stopwords):
    mystem = Mystem()
    text_lem = mystem.lemmatize(text)
    tokens = [token for token in text_lem if token != ' ' and token not in stopwords]
    return " ".join(tokens)

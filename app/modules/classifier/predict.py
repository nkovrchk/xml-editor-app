import pickle
from os import path
from .utils.prepare import prepare_text


def predict_category(text: str) -> str:
    with open(path.dirname(__file__) + '/model/model.pkl', 'rb') as f:
        sgd_load = pickle.load(f)

    prepared_text = prepare_text(text)

    category = sgd_load.predict([prepared_text])

    return category[0]

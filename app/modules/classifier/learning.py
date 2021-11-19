import pandas as pd
import app.utils as utils

if __name__ == '__main__':
    categories = []
    texts = []

    repo = utils.read_repository()

    for k in repo:
        categories.append(repo[k]['category'])
        texts.append(repo[k]['text'])

    csv_data = pd.DataFrame(
        {'category': categories, 'text': texts })

    csv_data.to_csv('data/learning_sets.csv')


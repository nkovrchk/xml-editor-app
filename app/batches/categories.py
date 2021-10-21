import json
import lxml.etree as et
import os

REPOSITORY_DIR = os.path.abspath('../../repository')


def get_text_category(file_name):
    file_path = f'{REPOSITORY_DIR}/{file_name}'
    xml_elem = et.parse(file_path)

    result = xml_elem.find('category').text

    return result


def get_file_names():
    source = []
    result = []

    for (_, _, filenames) in os.walk(REPOSITORY_DIR):
        source.extend(filenames)
        break

    for f in source:
        base_name = os.path.splitext(f)
        if base_name[1] == '.xml':
            result.append(f)

    return result


def write_to_json(categories):
    with open('./categories.json', 'w', encoding='utf8') as outfile:
        json.dump(categories, outfile, ensure_ascii=False)


if __name__ == '__main__':
    data = []
    files = get_file_names()

    for file in files:
        category = get_text_category(file)

        if category is not None:
            data.append(category)

    results = list(dict.fromkeys(data))

    write_to_json(results)







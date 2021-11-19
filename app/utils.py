import os
import lxml.etree as et

REPOSITORY_DIR = '../../repository'

def get_file_names():
    source = []
    result = []

    for (_, _, filenames) in os.walk(REPOSITORY_DIR):
        source.extend(filenames)
        break

    for f in source:
        base_name = os.path.splitext(f)
        if base_name[1] == '.xml':
            result.append(base_name[0])

    return result


def read_xml(file_name):
    file_path = f'{REPOSITORY_DIR}/{file_name}.xml'

    xml_elem = et.parse(file_path)

    xmlid = xml_elem.find('id')
    source = xml_elem.find('source')
    category = xml_elem.find('category')
    title = xml_elem.find('title')
    text = xml_elem.find('text')

    response = {
        'id': xmlid.text if xmlid is not None else '',
        'source': source.text if source is not None else '',
        'category': category.text if category is not None else '',
        'title': title.text if title is not None else '',
        'text': text.text if text is not None else '',
    }

    return response


def read_repository():
    file_names = get_file_names()
    result = {}

    for f in file_names:
        result[f] = read_xml(f)

    return result

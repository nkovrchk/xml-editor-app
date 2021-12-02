from xml.dom import minidom
from app.consts import REPOSITORY_DIR

import os
import lxml.etree as et


def get_file_path(file_name):
    return f'{REPOSITORY_DIR}/{file_name}.xml'


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


def write_xml(file_name, json_data=None):
    doc = et.Element('doc')
    xmlid = et.SubElement(doc, 'id')
    source = et.SubElement(doc, 'source')
    title = et.SubElement(doc, 'title')
    category = et.SubElement(doc, 'category')
    text = et.SubElement(doc, 'text')

    if json_data is not None:
        xmlid.text = json_data['id']
        source.text = json_data['source']
        title.text = json_data['title']
        category.text = json_data['category']
        text.text = et.CDATA(json_data['text'])

    xml_data = minidom.parseString(et.tostring(doc, encoding='UTF-8')).toprettyxml(indent='  ')

    file = open(get_file_path(file_name), 'w')
    file.write(xml_data)
    file.close()


def read_xml(file_base_name):
    file_path = get_file_path(file_base_name)

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

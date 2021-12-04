from os import path, rename, remove
from app.utils import write_xml, get_file_path, read_xml
from django.http import HttpResponse
from functools import reduce

import json
import re


def articles_controller(request, article_id):
    method = request.method
    response = {}

    # Get article
    if method == 'GET':
        response = get_article(article_id)
    # Create article
    elif method == 'POST':
        response = create_article(request, article_id)
    # Update article
    elif method == 'PATCH':
        response = update_article(request, article_id)
    # Delete article
    elif method == 'DELETE':
        response = delete_article(article_id)

    return HttpResponse(json.dumps(response, ensure_ascii=False), content_type='application/json')


def is_article_exists(article_id):
    file_path = get_file_path(article_id)
    return path.exists(file_path)


def validate_article(data):
    article_id = data['id']
    title = data['title']
    category = data['category']
    text = data['text']
    source = data['source']
    errors = {
        'id': [],
        'title': [],
        'category': [],
        'source': [],
        'text': []
    }

    is_empty_title = title is None or title == ''
    is_empty_text = text is None or title == ''
    is_empty_category = category is None or title == ''
    is_empty_source = source is None or title == ''
    is_correct_source = re.findall(r'^https://kgd\.ru/\w+', source)
    is_correct_id = re.findall(r'^\d+$', article_id)

    if is_empty_title:
        errors['title'].append('Необходимо заполнить Заголовок')

    if is_empty_category:
        errors['category'].append('Необходимо заполнить Категорию')

    if is_empty_text:
        errors['text'].append('Необходимо заполнить Текст')

    if is_empty_source:
        errors['source'].append('Необходимо заполнить Источник')

    if not is_correct_source:
        errors['source'].append('Ресурс должен иметь формат: https://kgd.ru/<-источник->')

    if not is_correct_id:
        errors['id'].append('Допускаются только цифры 0-9')

    return {
        'length': reduce(lambda x, key: x + len(errors[key]), errors, 0),
        'errors': errors
    }


def get_article(article_id):
    if not is_article_exists(article_id):
        return {
            'success': False,
            'errors': {'id': ['Файл с таким названием не существует']},
        }

    article = read_xml(article_id)

    return {
        'success': True,
        'data': article,
    }


def create_article(request, article_id):
    file_data = json.loads(request.body)
    if is_article_exists(article_id):
        return {
            'success': False,
            'errors': {
                'id': ['Файл с таким названием уже существует']
            }
        }

    errors = validate_article(file_data)

    if errors['length'] > 0:
        return {
            'success': False,
            'errors': errors['errors']
        }

    write_xml(article_id, file_data)

    return {
        'success': True,
    }


def update_article(request, article_id):
    file_data = json.loads(request.body)
    new_id = file_data['id']

    is_renamed = article_id != new_id

    if is_renamed and is_article_exists(new_id):
        return {
            'success': False,
            'errors': {
                'id': ['Файл с таким названием уже существует']
            }
        }

    errors = validate_article(file_data)

    if errors['length'] > 0:
        return {
            'success': False,
            'errors': errors['errors']
        }

    write_xml(article_id, file_data)

    if is_renamed:
        old_path = get_file_path(article_id)
        new_path = get_file_path(new_id)
        rename(old_path, new_path)

    return {
        'success': True,
    }


def delete_article(article_id):
    file_path = get_file_path(article_id)
    remove(file_path)

    return {
        'success': True
    }

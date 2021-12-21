import math
from os import walk, path
from app.consts import REPOSITORY_DIR
from app.utils import read_xml
from django.http import HttpResponse

import json


def collection_controller(request):
    method = request.method
    response = {}

    if method == 'GET':
        response = get_articles(request)

    return HttpResponse(json.dumps(response, ensure_ascii=False), content_type='application/json')


def get_articles(request):
    params = request.GET

    response = {}

    '''
        functional filters and non-functional (limit, offset)
        response example:
        {
            limit: 5,
            offset: 10,
            size: 5,
            results: [...],
            filtered: 224,
            links: {
                current: "localhost:8080/api/files?limit=5&offset=10",
                prev:  "localhost:8080/api/files?limit=5&offset=5",
                next:  "localhost:8080/api/files?limit=5&offset=15",
            }
        }
    '''

    limit = int(params['limit']) if params['limit'] is not None else None
    offset = int(params['offset']) if params['offset'] is not None else None

    sort_by = params['sort_by'] if params['sort_by'] is not None else None
    sort_value = params['sort_value'] if params['sort_value'] is not None else None

    '''
    search_by = params['search_by']
    search = params['search']
    page = params['page']

    match_case = params['match_case']
    full_match = params['full_match']
    response = {
        'total': 0,
        'page': 1,
        'limit': 0,
        'records': [],
        'all': [],
    }
    '''

    files = []
    source = []

    for (_, _, filenames) in walk(REPOSITORY_DIR):
        files.extend(filenames)
        break

    for file in files:
        base_name = path.splitext(file)
        if base_name[1] == '.xml':
            source.append(read_xml(base_name[0]))

    response['empty'] = len(source) == 0

    if sort_by is not None:
        source = sorted(source, key=lambda file_data: file_data[sort_by])

    if sort_value is not None:
        source = source[::-1] if sort_value == 'desc' else source

    filtered_articles = len(source)
    response['filtered'] = filtered_articles

    if limit is not None and offset is not None:
        source = source[offset:offset + limit]
        total_pages = math.ceil(filtered_articles / limit)
        current_page = math.ceil(offset / limit) + 1

        response['currentPage'] = current_page

        response['previousPages'] = [current_page - 1] if current_page > 1 else []
        response['nextPages'] = [current_page + 1] if current_page < total_pages else []

    response['results'] = source

    return response

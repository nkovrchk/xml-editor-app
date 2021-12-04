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

    if sort_by is not None:
        source = sorted(source, key=lambda file_data: file_data[sort_by])

    if sort_value is not None:
        source = source[::-1] if sort_value == 'desc' else source

    filtered_articles = len(source)

    if limit is not None and offset is not None:
        source = source[offset:offset + limit]
        total_pages = math.ceil(filtered_articles / limit)
        current_page = math.ceil(offset / limit) + 1

        response['currentPage'] = current_page

        response['previousPages'] = [current_page - 1] if current_page > 1 else []
        response['nextPages'] = [current_page + 1] if current_page < total_pages else []

    response['results'] = source

    '''
    fileDetails = []

    for f in source:
        data = {}

        dataPath = f'{repository}/{f}.xml'

        dataId = et.parse(dataPath).find('id').text
        dataTitle = et.parse(dataPath).find('title').text

        data['id'] = dataId if dataId is not None else ''
        data['title'] = dataTitle if dataTitle is not None else ''
        data['name'] = f

        fileDetails.append(data)

    if len(search) > 0:
        if full_match == 'true' and match_case == 'false':
            pattern = re.compile(f'^{search}$')

        elif full_match == 'true':
            pattern = re.compile(f'^{search}$', re.IGNORECASE)

        elif match_case == 'true':
            pattern = re.compile(f'{search}')

        else:
            pattern = re.compile(f'{search}', re.IGNORECASE)

        temp = []

        for f in fileDetails:
            matchings = re.findall(pattern, f[search_by])

            if len(matchings) > 0:
                temp.append(f['name'])

        source = temp
        # source = [f['name'] for f in fileDetails if re.match(pattern, f[search_by])]

    response['total'] = len(source)

    if sort_by is not None and sort_val is not None:
        source.sort()

        if sort_val == 'desc':
            source = source[::-1]

    if page is not None and limit is not None:
        page = int(page)
        limit = int(limit)

        total_pages = math.ceil(len(source)/limit)
        calc_page = total_pages if page > total_pages else page if page > 0 else 1

        # 0:9; 10:19; 20:29
        response['page'] = calc_page
        response['limit'] = limit
        source = source[(calc_page-1)*limit:calc_page*limit]
        response['records'] = source
    '''

    return response

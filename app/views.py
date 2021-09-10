from django.http import HttpResponse
from django.shortcuts import render
from xml.dom import minidom
import lxml.etree as et
import os
import json
import math
import re

repository = os.path.abspath('./repository')


def writeXML(filePath, jsonData=None):
    doc = et.Element('doc')
    xmlid = et.SubElement(doc, 'id')
    source = et.SubElement(doc, 'source')
    title = et.SubElement(doc, 'title')
    category = et.SubElement(doc, 'category')
    text = et.SubElement(doc, 'text')

    if jsonData is not None:
        xmlid.text = jsonData['id']
        source.text = jsonData['source']
        title.text = jsonData['title']
        category.text = jsonData['category']
        text.text = et.CDATA(jsonData['text'])

    xmlData = minidom.parseString(et.tostring(doc, encoding='UTF-8')).toprettyxml(indent='  ')

    file = open(filePath, 'w')
    file.write(xmlData)
    file.close()


def getFilePath(fileName):
    return f'{repository}/{fileName}.xml'


def index(request):
    isExists = os.path.exists(repository)

    if not isExists:
        os.mkdir(repository)

    return render(request, 'xmleditor/index.html', {})

def getAllArticles(request):
    files = []
    source = []

    for (_, _, filenames) in os.walk(repository):
        files.extend(filenames)
        break

    for file in files:
        baseName = os.path.splitext(file)
        if baseName[1] == '.xml':
            source.append(readFileData(baseName[0]))

    return HttpResponse(json.dumps(source), content_type='application/json')


def getFiles(request):
    params = request.GET

    print(params)


    '''
        functional filters and non-functional (limit, offset)
        response example:
        {
            limit: 5,
            offset: 10,
            size: 5,
            results: [...],
            links: {
                current: "localhost:8080/api/files?limit=5&offset=10",
                prev:  "localhost:8080/api/files?limit=5&offset=5",
                next:  "localhost:8080/api/files?limit=5&offset=15",
            }
        }
    '''

    limit = int(params['limit']) if params['limit'] is not None else None
    offset = int(params['offset']) if params['offset'] is not None else None

    '''
    search_by = params['search_by']
    search = params['search']
    page = params['page']
    sort_by = params['sort_by']
    sort_val = params['sort_val']
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

    for (_, _, filenames) in os.walk(repository):
        files.extend(filenames)
        break

    for file in files:
        baseName = os.path.splitext(file)
        if baseName[1] == '.xml':
            source.append(readFileData(baseName[0]))

    if limit is not None and offset is not None:
        source = source[offset:offset + limit]

    response = {
        'offset': offset,
        'limit': limit,
        'size': len(source),
        'results': source,
    }

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

    return HttpResponse(json.dumps(response), content_type='application/json')


def readFileData(fileName):
    filePath = getFilePath(fileName)
    isExists = os.path.exists(filePath)

    xmlelem = et.parse(filePath)

    xmlid = xmlelem.find('id')
    source = xmlelem.find('source')
    category = xmlelem.find('category')
    title = xmlelem.find('title')
    text = xmlelem.find('text')

    response = {
        'id': xmlid.text if xmlid is not None else '',
        'source': source.text if source is not None else '',
        'category': category.text if category is not None else '',
        'title': title.text if title is not None else '',
        'text': text.text if text is not None else '',
    }

    return response


def getFileData(request, fileName):
    filePath = getFilePath(fileName)
    isExists = os.path.exists(filePath)

    if not isExists:
        return HttpResponse(status=404, content='Файл не существует')

    xmlelem = et.parse(filePath)

    xmlid = xmlelem.find('id')
    source = xmlelem.find('source')
    category = xmlelem.find('category')
    title = xmlelem.find('title')
    text = xmlelem.find('text')

    response = {
        'id': xmlid.text if xmlid is not None else '',
        'source': source.text if source is not None else '',
        'category': category.text if category is not None else '',
        'title': title.text if title is not None else '',
        'text': text.text if text is not None else '',
    }

    return HttpResponse(json.dumps(response), content_type='application/json')


def saveFile(request, fileName):
    filePath = getFilePath(fileName)
    reqData = request.body
    jsonData = json.loads(reqData)

    isExists = os.path.exists(filePath)

    if not isExists:
        return HttpResponse(status=404, content='Файл не существует')

    # Check attr existance
    if jsonData['category'] is None:
        return HttpResponse(status=500, content='Необходимо заполнить Категорию')

    if jsonData['text'] is None:
        return HttpResponse(status=500, content='Необходимо заполнить Текст')

    if jsonData['source'] is None:
        return HttpResponse(status=500, content='Необходимо заполнить Источник')
    else:
        isCorrect = re.findall(r'^https://kgd\.ru/\w+', jsonData['source'])

        if not isCorrect:
            return HttpResponse(status=500, content='Ресурс должен иметь формат: https://kgd.ru/<-источник->')

    if jsonData['title'] is None:
        return HttpResponse(status=500, content='Необходимо заполнить Заголовок')

    if jsonData['id'] is None:
        return HttpResponse(status=500, content='Необходимо заполнить Идентификатор')
    else:
        isCorrect = re.findall(r'^\d+$', jsonData['id'])

        if not isCorrect:
            return HttpResponse(status=500, content='Идентификатор должен содержать только цифры')

    writeXML(filePath, jsonData)

    if jsonData['name'] != fileName:
        newFileName = jsonData['name']
        renameFilePath = getFilePath(newFileName)
        isExists = os.path.exists(renameFilePath)

        isCorrect = re.findall(r'^[A-Za-zА-Яа-яёЁ\d]+$', newFileName)

        if not isCorrect:
            return HttpResponse(status=500, content='Допускаются только цифры и буквы русского или латинского алфавит')

        print(filePath, renameFilePath)

        if isExists:
            return HttpResponse(status=409, content='Файл с таким названием уже существует')

        os.rename(filePath, renameFilePath)

    return HttpResponse(status=200)


def addFile(request, fileName):
    filePath = getFilePath(fileName)
    isExists = os.path.exists(filePath)

    if isExists:
        return HttpResponse(409)

    writeXML(getFilePath(fileName))

    return HttpResponse(200)


def deleteFile(request, fileName):
    filePath = getFilePath(fileName)
    isExists = os.path.exists(filePath)

    if not isExists:
        return HttpResponse(status=404, content='Файл не существует')

    os.remove(filePath)
    return HttpResponse(200)

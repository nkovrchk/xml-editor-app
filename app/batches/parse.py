import requests
import os
import lxml.etree as et
import datetime
import queue
import re
import time
from xml.dom import minidom
from threading import Thread
from bs4 import BeautifulSoup
from app.consts import BASE_DIR

# Consts
today = datetime.date.today()
dateDecrement = datetime.timedelta(days=1)
limit = 10
parserQueue = queue.Queue()
directoryName = f'{BASE_DIR}/repository'
url = 'https://kgd.ru'


def getGatewayUrl(date):
    return f'{url}/news/itemlist/date/{str(date.year)}/{str(date.month)}/{str(date.day)}/'


def getNewsUrl(newsUrl):
    return f'{url}{newsUrl}'


def getRefs(stack, currentDate, decrement):
    count = 0
    while count < limit:
        response = requests.get(getGatewayUrl(currentDate))
        soup = BeautifulSoup(response.text, 'lxml')
        anchors = soup.find_all('h3', class_='tagItemTitle')
        for i in range(0, len(anchors)):
            href = anchors[i].find('a', href=True)['href']
            if href is not None:
                stack.put(href)
        currentDate -= decrement
        count += len(anchors)


def parseNews(stack, gatewayThread):
    while gatewayThread.is_alive() or not stack.empty():
        if not stack.empty():
            newsHref = stack.get()
            print(f'[{datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}] | {newsHref}')
            fullUrl = getNewsUrl(newsHref)
            response = requests.get(fullUrl)

            if response.status_code != 200:
                continue

            context = BeautifulSoup(response.text, 'lxml')

            #Get attributes

            newsId = re.findall(r'item/(\d+)-', newsHref)[0]
            newsTitle = context.find('h1', class_='itemTitle')
            newsCategory = context.find('span', class_='itemCategory')

            newsText = context.find('div', class_='itemFullText')
            newsTags = context.find('div', class_='itemTagsBlock')

            titleValue = ''
            textValue = ''
            categoryValue = ''
            tagsValue = []

            if newsTitle is not None:
                titleValue = newsTitle.find(text=True).strip()

            if newsText is not None:
                texts = newsText.findAll('p')

                for i in range(len(texts)):
                    pText = texts[i].string

                    if isinstance(pText, str):
                        textValue += pText.replace(u'\xa0', '')

            if newsCategory is not None:
                categoryValue = newsCategory.find('a').text

            if newsTags is not None:
                tagsValue = newsTags.findAll('a')

            doc = et.Element('doc')
            xmlId = et.SubElement(doc, 'id', auto="true", type="list", verify="true")
            title = et.SubElement(doc, 'title', auto="true", type="list", verify="true")
            source = et.SubElement(doc, 'source', auto="true", type="list", verify="true")
            category = et.SubElement(doc, 'category', auto="true", type="list", verify="true")
            text = et.SubElement(doc, 'text', auto="true", type="list", verify="true")
            tags = et.SubElement(doc, 'tags', auto="true", type="list", verify="true")

            xmlId.text = newsId
            title.text = titleValue
            source.text = fullUrl.strip()
            category.text = categoryValue
            text.text = et.CDATA(textValue)

            for i in range(len(tagsValue)):
                tagValue = tagsValue[i].text
                tagEl = et.SubElement(tags, 'value')
                tagEl.text = tagValue

            xmlData = minidom.parseString(et.tostring(doc, encoding='UTF-8')).toprettyxml(indent='    ')

            #Write file
            file = open(f'{directoryName}/{newsId}.xml', 'w', encoding='utf8')
            file.write(xmlData)
            file.close()


if __name__ == '__main__':
    directory = os.listdir()
    if directoryName not in directory:
        os.mkdir(directoryName)

    gatewayTh = Thread(target=getRefs, args=(parserQueue, today, dateDecrement))
    th1 = Thread(target=parseNews, args=(parserQueue, gatewayTh))
    th2 = Thread(target=parseNews, args=(parserQueue, gatewayTh))

    startTime = time.time()

    gatewayTh.start()
    th1.start()
    th2.start()

    gatewayTh.join()
    th1.join()
    th2.join()

    print(f'Выполнено за {round(time.time() - startTime, 2)}с')
    os.system(f'ls {directoryName} | wc -l')

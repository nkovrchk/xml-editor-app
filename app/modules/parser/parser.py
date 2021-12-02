import urllib.request
import requests
import os
import lxml.etree as et
import datetime
import concurrent.futures
import re
import time
from xml.dom import minidom
from threading import Thread
from bs4 import BeautifulSoup
from queue import Queue
from app.consts import REPOSITORY_DIR
from consts import LIMIT, BASE_URL, TODAY, MAX_THREADS


def get_gateway_url(date):
    return f'{BASE_URL}/news/itemlist/date/{str(date.year)}/{str(date.month)}/{str(date.day)}/'


def get_news_url(news_url):
    return f'{BASE_URL}{news_url}'


def get_decrement(number):
    return datetime.timedelta(days=number)


def get_refs(current_date, anchor_stack, decrement_stack):
    while anchor_stack.qsize() < LIMIT:
        number = decrement_stack.get()
        target_date = current_date - get_decrement(number)
        response = requests.get(get_gateway_url(target_date))
        soup = BeautifulSoup(response.text, 'lxml')
        anchors = soup.find_all('h3', class_='tagItemTitle')
        for index in range(0, len(anchors)):
            href = anchors[index].find('a', href=True)['href']
            if href is not None:
                print(f'[{datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")}] | {href}')
                anchor_stack.put(href)


def parse_news(ref):
    full_url = get_news_url(ref)
    req = urllib.request.Request(url=full_url)

    with urllib.request.urlopen(req) as f:
        s = f.read().decode('utf-8')
        soup = BeautifulSoup(s, 'lxml')

        try:
            text_container = soup.find('div', class_='itemFullText')

            news_title = soup.select('#k2Container > div.itemHeader > h1')[0].text.strip()
            news_id = re.findall(r'item/(\d+)-', ref)[0]
            news_category = soup.select('#k2Container > div.itemToolbar > span.itemCategory > a')[0].text.strip()

            news_text = ''

            if text_container is not None:
                texts = text_container.findAll('p')

                for t in range(len(texts)):
                    p_text = texts[t].string

                    if isinstance(p_text, str):
                        news_text += p_text.replace(u'\xa0', '')

            doc = et.Element('doc')
            xml_id = et.SubElement(doc, 'id', auto="true", type="list", verify="true")
            title = et.SubElement(doc, 'title', auto="true", type="list", verify="true")
            source = et.SubElement(doc, 'source', auto="true", type="list", verify="true")
            category = et.SubElement(doc, 'category', auto="true", type="list", verify="true")
            text = et.SubElement(doc, 'text', auto="true", type="list", verify="true")

            xml_id.text = news_id
            title.text = news_title
            source.text = full_url.strip()
            category.text = news_category
            text.text = et.CDATA(news_text)

            xml_data = minidom.parseString(et.tostring(doc, encoding='UTF-8')).toprettyxml(indent='    ')

            # Write file
            file = open(f'{REPOSITORY_DIR}/{news_id}.xml', 'w', encoding='utf8')
            file.write(xml_data)
            file.close()
        except Exception as e:
            print(e)


def download_news(news_refs):
    threads = min(MAX_THREADS, len(news_refs))

    with concurrent.futures.ThreadPoolExecutor(max_workers=threads) as executor:
        executor.map(parse_news, news_refs)


if __name__ == '__main__':
    numbers_queue = Queue()
    refs_queue = Queue()

    directory = os.listdir()
    if REPOSITORY_DIR not in directory:
        os.mkdir(REPOSITORY_DIR)

    i = 0
    while i < LIMIT:
        numbers_queue.put(i + 1)
        i += 1

    ref_th1 = Thread(target=get_refs, args=(TODAY, refs_queue, numbers_queue))
    ref_th2 = Thread(target=get_refs, args=(TODAY, refs_queue, numbers_queue))

    fetch_start_time = time.time()

    ref_th1.start()
    ref_th2.start()

    ref_th1.join()
    ref_th2.join()

    fetch_time = round(time.time() - fetch_start_time, 2)

    news_urls = []

    while not refs_queue.empty():
        news_urls.append(refs_queue.get())

    parse_start_time = time.time()

    download_news(news_urls)

    parse_time = round(time.time() - parse_start_time, 2)
    total_time = parse_time + fetch_time

    print(f'Получение ссылок выполнено за {fetch_time}с')
    print(f'Парсинг выполнен за {parse_time}с')
    print(f'Итоговое время: {total_time}с')
    os.system(f'ls {REPOSITORY_DIR} | wc -l')

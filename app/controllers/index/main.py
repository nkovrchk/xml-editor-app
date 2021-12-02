from os import path, mkdir
from app.consts import REPOSITORY_DIR
from django.shortcuts import render


def index_controller(request):
    is_exists = path.exists(REPOSITORY_DIR)

    if not is_exists:
        mkdir(REPOSITORY_DIR)

    return render(request, 'xml_editor/index.html', {})

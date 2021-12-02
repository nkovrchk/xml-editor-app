from app.modules.classifier.predict import predict_category
from django.http import HttpResponse

import json


def classifier_controller(request):
    data = json.loads(request.body)

    text = data['text']

    response = {}

    if len(text) < 100:
        response['errors'] = ['Text length is less than 100 symbols']
        response['success'] = False
        return HttpResponse(json.dumps(response), content_type='application/json')

    category = predict_category(text)

    response = {
        'data': {
            'category': category
        },
        'success': True,
    }

    return HttpResponse(json.dumps(response), content_type='application/json')

from django.urls import path
from app.controllers.index.main import index_controller
from app.controllers.collection.main import collection_controller
from app.controllers.articles.main import articles_controller
from app.controllers.classifier.main import classifier_controller

urlpatterns = [
    path('', index_controller, name='index_controller'),
    path('api/articles', collection_controller, name='collection_controller'),
    path('api/articles/<str:article_id>', articles_controller, name='articles_controller'),
    path('api/classifier', classifier_controller, name='classifier_controller'),
]

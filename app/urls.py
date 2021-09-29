from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('articles', views.getAllArticles, name='getAllArticles'),
    path('articles/<str:articleId>', views.getArticle, name='getArticle'),
    path('files', views.getFiles, name='getFiles'),
    path('file/<str:fileName>', views.getFileData),
    path('file/save/<str:fileName>', views.saveFile),
    path('file/add/<str:fileName>', views.addFile),
    path('file/delete/<str:fileName>', views.deleteFile),
]

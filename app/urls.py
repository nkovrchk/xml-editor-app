from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/articles', views.getAllArticles, name='getAllArticles'),
    path('api/files', views.getFiles, name='getFiles'),
    path('api/file/<str:fileName>', views.getFileData),
    path('file/save/<str:fileName>', views.saveFile),
    path('file/add/<str:fileName>', views.addFile),
    path('file/delete/<str:fileName>', views.deleteFile),
]

from django.contrib import admin
from django.urls import path, include

handler404 = 'app.views.handleNotFound'

urlpatterns = [
    path('', include('app.urls')),
    path('admin/', admin.site.urls),
]

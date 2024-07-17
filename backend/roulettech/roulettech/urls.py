from django.contrib import admin
from django.urls import path
from .views import get_users, get_countries

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/get-users/", get_users, name="get_users"),
    path("api/get-countries/", get_countries, name="get_countries"),
]

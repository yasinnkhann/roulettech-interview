import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(["GET"])
def get_users(request):
    gender = request.GET.get("gender", None)
    page = request.GET.get("page", 1)
    users_count = request.GET.get("users_count", 5)
    url = f"https://randomuser.me/api/?results={users_count}&page={page}"

    if gender:
        url += f"&gender={gender}"

    response = requests.get(url)

    if response.status_code == 200:
        return Response(response.json(), status=status.HTTP_200_OK)
    else:
        return Response(
            {"message": "Error fetching users"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def get_countries(request):
    url = "https://restcountries.com/v3.1/all?fields=name,flags"
    response = requests.get(url)

    if response.status_code == 200:
        return Response(response.json(), status=status.HTTP_200_OK)
    else:
        return Response(
            {"message": "Error fetching countries"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

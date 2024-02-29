from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_400_BAD_REQUEST,
                                   HTTP_500_INTERNAL_SERVER_ERROR)
from rest_framework.views import APIView
from .serializers import *

class loginAPIView(APIView):
    serializer = LoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class signinAPIView(APIView):
    serializer = SigninSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = SigninSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

class agendaGetAPIView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(AgendaGetSerializer(request), status=HTTP_200_OK)


class createPeopleAPIView(APIView):
    serializer = CreatePeopleSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = CreatePeopleSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class deletePeopleAPIView(APIView):
    serializer = DeletePeopleSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = DeletePeopleSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
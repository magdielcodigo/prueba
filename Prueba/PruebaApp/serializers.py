import random
from datetime import date, timedelta, datetime
from django.forms.models import model_to_dict
from django.urls import reverse
from django.db.models import Q
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.serializers import (CharField, EmailField, BooleanField,
                                        DecimalField, ImageField, DateField)
from rest_framework.authtoken.models import Token
from .models import AgendaModel


class LoginSerializer(serializers.Serializer):
    user = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    msg = serializers.CharField(allow_blank=True, read_only=True)
    success = serializers.BooleanField(default=False)
    extraData = serializers.JSONField(read_only=True)

    def validate(self, data):
        user = authenticate(username=data.get('user'),
                            password=data.get('password'))
        if user is None:
            data['msg'] = 'Credenciales Invalidas'
            data['success'] = False
            return data
        if not user.is_active:
            data['msg'] = 'Usuario Inactivo'
            data['success'] = False
            return data
        data['success'] = True
        data['msg'] = 'success'
        user = User.objects.filter(id=user.id).first()
        data['extraData'] = {
            'id': user.id,
            'nombre': f'{user.first_name} {user.last_name}'
        }
        return data

class SigninSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    lastname = serializers.CharField(required=True)
    user = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    msg = serializers.CharField(allow_blank=True, read_only=True)
    success = serializers.BooleanField(default=False)
    extraData = serializers.JSONField(read_only=True)

    def validate(self, data):
        try:
            user = User.objects.create_user(first_name=data.get('name'),last_name=data.get('lastname'),username=data.get('user'))
            user.set_password(data.get('password'))
            user.save()
        except:
            data['success'] = False
            data['msg'] = 'Error al crear usuario'
            return data    
        data['success'] = True
        data['msg'] = 'success'
        user = User.objects.filter(id=user.id).first()
        data['extraData'] = {
            'id': user.id,
            'nombre': f'{user.first_name} {user.last_name}'
        }
        return data

def AgendaGetSerializer(request):
    data = request.GET.dict()
    user = User.objects.filter(id=data['id']).first()
    agenda = AgendaModel.objects.filter(user=user)
    agendaSet = []
    for a in agenda:
        agendaSet.append({
            'id':a.id,
            'nombre':a.nombre,
            'direccion':a.direccion,
            'telefono':a.telefono
        })
    return {'agenda':agendaSet,'success':True,'msg':''}

class CreatePeopleSerializer(serializers.Serializer):
    nombre = serializers.CharField(required=True)
    direccion = serializers.CharField(required=True)
    telefono = serializers.CharField(required=True)
    user = serializers.CharField(required=True)
    msg = serializers.CharField(allow_blank=True, read_only=True)
    success = serializers.BooleanField(default=False)
    extraData = serializers.JSONField(read_only=True)

    def validate(self, data):
        user = User.objects.filter(id=data.get('user')).first()
        try:
            AgendaModel(user=user,nombre=data.get('nombre'),direccion=data.get('direccion'),telefono=data.get('telefono')).save()
        except:
            data['success'] = False
            data['msg'] = "Ha ocurrido un error al guardar"
            return data
        data['success'] = True
        data['msg'] = 'Se ha guardado correctamente'
        return data

class DeletePeopleSerializer(serializers.Serializer):
    persona = serializers.CharField(required=True)
    user = serializers.CharField(required=True)
    msg = serializers.CharField(allow_blank=True, read_only=True)
    success = serializers.BooleanField(default=False)
    extraData = serializers.JSONField(read_only=True)

    def validate(self, data):
        user = User.objects.filter(id=data.get('user')).first()
        try:
            AgendaModel.objects.filter(id=data.get('persona')).delete()
        except:
            data['success'] = False
            data['msg'] = "Ha ocurrido un error al eliminar"
            return data
        data['success'] = True
        data['msg'] = 'Se ha eliminado correctamente'
        return data
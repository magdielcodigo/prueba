from django.db import models
from django.contrib.auth.models import User, Group
# Create your models here.
class AgendaModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=200)
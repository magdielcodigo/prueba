from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from .views import Index
from .api import loginAPIView, signinAPIView, agendaGetAPIView, createPeopleAPIView, deletePeopleAPIView

urlpatterns = [
    path('', Index),
    path('api/', include([
        path('login/', loginAPIView.as_view()),
        path('signin/', signinAPIView.as_view()),
        path('agendaGet/', agendaGetAPIView.as_view()),
        path('agendaCreate/', createPeopleAPIView.as_view()),
        path('agendaDelete/', deletePeopleAPIView.as_view()),
    ]))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
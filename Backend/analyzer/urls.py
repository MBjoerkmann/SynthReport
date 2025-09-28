from django.urls import path
from .views import analyze_url_view, generate_report_view

urlpatterns = [
    path('analyze/', analyze_url_view, name='analyze_url'),
    path('generate-report/', generate_report_view, name='generate_report'),
]

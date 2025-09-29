from django.urls import path
from .views import AnalyzeUrlView, GenerateReportView

urlpatterns = [
    path('analyze-url/', AnalyzeUrlView.as_view(), name='analyze-url'),
    path('generate-report/', GenerateReportView.as_view(), name='generate-report'),
]

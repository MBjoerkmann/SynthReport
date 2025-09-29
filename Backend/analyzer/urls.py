from django.urls import path
from .views import AnalyzeUrlView

urlpatterns = [
    path('analyze/', AnalyzeUrlView.as_view(), name='analyze-url'),
]

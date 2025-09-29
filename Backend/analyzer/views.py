from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UrlSerializer, ReportSerializer
from .scraper import scrape_website
from .analyzer import analyze_content
from django.core.mail import EmailMessage
from .report_generator import generate_report

from rest_framework.permissions import AllowAny

from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([AllowAny])
def default_view(request):
    return Response({"message": "API is running"})


class AnalyzeUrlView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = UrlSerializer(data=request.data)
        if serializer.is_valid():
            url = serializer.validated_data['url']
            try:
                content = scrape_website(url)
                analysis = analyze_content(content)
                return Response(analysis)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.conf import settings

class GenerateReportView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            email_address = serializer.validated_data['email']
            analysis_data = serializer.validated_data['analysis']

            try:
                pdf_content = generate_report(analysis_data)
                
                email = EmailMessage(
                    'Your AI & Automation Report',
                    'Please find your report attached.',
                    settings.EMAIL_HOST_USER,
                    [email_address]
                )
                email.attach('report.pdf', pdf_content, 'application/pdf')
                email.send()

                return Response({"message": "Report sent successfully"})
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

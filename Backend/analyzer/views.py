from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UrlSerializer
from .scraper import scrape_website
from .analyzer import analyze_content

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

from django.http import JsonResponse
from .scraper import scrape_website
from .analyzer import analyze_content
from .report_generator import generate_report
import json

def analyze_url_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        url = data.get('url')
        if not url:
            return JsonResponse({'error': 'URL is required'}, status=400)
        
        try:
            content = scrape_website(url)
            analysis = analyze_content(content)
            return JsonResponse(analysis)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def generate_report_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            generate_report(data)
            return JsonResponse({'message': 'Report generated successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

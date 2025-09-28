import google.generativeai as genai
from django.conf import settings
import json

def analyze_content(content):
    genai.configure(api_key=settings.GEMINI_API_KEY)

    prompt = f"""Based on the following website content, identify 3 potential use cases for AI and automation. For each use case, provide a 'name', a 'description' of how it would help the business, and a 'feasibility' rating (Low, Medium, or High). Please respond ONLY with a valid JSON object in the format: {{ "recommendations": [...] }}

    Website Content:
    {content}
    """

    model = genai.GenerativeModel('models/gemini-pro-latest')
    response = model.generate_content(prompt)

    # The response from Gemini might have ```json ... ``` around the JSON object.
    # This is a simple way to extract the JSON content.
    json_string = response.text.strip().replace('```json', '').replace('```', '')
    return json.loads(json_string)
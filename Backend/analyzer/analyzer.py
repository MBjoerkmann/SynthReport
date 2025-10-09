from google import genai
from django.conf import settings
import json

def analyze_content(content):
    client = genai.Client(api_key=settings.GEMINI_API_KEY)

    prompt = f"""
    You're an AI consultant, and it's your job to advice clients based on what you get to know about them from their company website.
    Analyze the following website content and generate a report in JSON format. The report should contain:
    1.  A 'company_name' (the name of the company).
    2.  A 'company_description' (a brief, one-paragraph overview of the company).
    3.  A list of 3 'recommendations' for AI and automation.

    For each recommendation, provide:
    -   'name': A short, descriptive name for the use case.
    -   'description': A paragraph explaining how it would help the business.
    -   'feasibility': A rating of Low, Medium, or High.
    -   'action_plan': A list of concrete steps for implementation (up to 10 steps).
    -   'duration': An estimated time for implementation (e.g., '3-6 months').
    -   'steps': A list of steps for implementation, each with a 'name' and 'duration' (e.g., {{'name': 'Step 1: ...', 'duration': '1-2 weeks'}}). Be as accurate and realistic as possible.

    Please respond ONLY with a valid JSON object.

    Website Content:
    {content}
    """
    model = 'gemini-2.5-flash'
    response = client.models.generate_content(
        model=model, contents=prompt
    )

    # The response from Gemini might have ```json ... ``` around the JSON object.
    # This is a simple way to extract the JSON content.
    json_string = response.text.strip().replace('```json', '').replace('```', '')
    return json.loads(json_string)
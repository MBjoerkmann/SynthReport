
from firecrawl import Firecrawl
from django.conf import settings

def scrape_website(url):
    app = Firecrawl(api_key=settings.FIRECRAWL_API_KEY)
    scraped_data = app.scrape(url)
    return scraped_data.markdown

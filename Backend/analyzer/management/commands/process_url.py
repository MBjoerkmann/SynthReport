
from django.core.management.base import BaseCommand
from analyzer.scraper import scrape_website

from analyzer.analyzer import analyze_content
from analyzer.report_generator import generate_report

class Command(BaseCommand):
    help = 'Scrapes a URL, analyzes its content, and generates a PDF report.'

    def add_arguments(self, parser):
        parser.add_argument('url', type=str, help='The URL to analyze.')

    def handle(self, *args, **options):
        url = options['url']

        self.stdout.write(self.style.SUCCESS(f'Scraping {url}...'))
        content = scrape_website(url)



        self.stdout.write(self.style.SUCCESS('Analyzing content...'))
        analysis = analyze_content(content)

        self.stdout.write(self.style.SUCCESS('Generating report...'))
        generate_report(analysis)

        self.stdout.write(self.style.SUCCESS('Report generated as report.pdf'))

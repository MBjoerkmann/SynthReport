
from django.template.loader import render_to_string
from weasyprint import HTML

def generate_report(data):
    html_string = render_to_string('analyzer/report_template.html', {'recommendations': data['recommendations']})
    html = HTML(string=html_string)
    html.write_pdf('report.pdf')

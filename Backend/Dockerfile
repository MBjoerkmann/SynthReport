# Use Python 3.11 slim image as base
FROM python:3.11-slim

# Set environment variables
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1
# Prevents Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Set work directory
WORKDIR /app

# Install system dependencies (includes WeasyPrint requirements)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf-2.0-0 \
    libffi-dev \
    libcairo2 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create staticfiles dir so the volume mount inherits correct ownership
RUN mkdir -p /app/staticfiles

# Create a non-root user for security
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]

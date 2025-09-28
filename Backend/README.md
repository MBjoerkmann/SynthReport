
# SynthReport Backend

This is a Django backend for SynthReport.

## Setup

1. Create a virtual environment:
   ```
   python3 -m venv venv
   ```
2. Activate the virtual environment:
   ```
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run the migrations:
   ```
   python3 manage.py migrate
   ```

## Running the server

1. Activate the virtual environment:
   ```
   source venv/bin/activate
   ```
2. Run the development server:
   ```
   python3 manage.py runserver
   ```

The server will be running at `http://127.0.0.1:8000/`.

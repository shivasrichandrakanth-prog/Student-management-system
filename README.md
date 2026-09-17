# Student Management CRUD Web Application

A simple full-stack CRUD application for the SOP activity.

## Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Python Django + Django REST Framework
- Database: SQLite
- API testing: Postman

## Features
- Create student
- Read/list students
- Update student
- Delete student
- Search students
- Client-side and server-side validation
- REST API
- Responsive UI

## Requirements
Python 3.10+ recommended.

## Backend setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend API:
http://127.0.0.1:8000/api/students/

## Frontend
Open `frontend/index.html` in a browser after starting the backend.

If the browser blocks local requests, serve the frontend with a simple local server:
```bash
cd frontend
python -m http.server 5500
```
Then open:
http://127.0.0.1:5500

## API Endpoints
- GET /api/students/
- POST /api/students/
- GET /api/students/<id>/
- PUT /api/students/<id>/
- DELETE /api/students/<id>/

## Postman
Import `docs/postman_collection.json`.

## Project structure
```text
Student_Management_CRUD/
├── frontend/
├── backend/
└── docs/
```

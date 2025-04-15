# Employee CRUD Operation Project

This is a Employee CRUD (Create, Read, Update, Delete) application. The project uses the following technology stack:
- **Backend**: Django (Python 3.12)
- **Frontend**: React.js
- **API**: Axios
- **Database**: MySQL

## Features
- Add new employees.
- View a list of employees.
- Update employee details.
- Delete employees.

---

## Prerequisites
Before you proceed with the setup, ensure you have the following installed:
- Python 3.12
- Node.js (for React.js)
- MySQL Database
- Git

---

## Backend Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Set Up a Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
Install all required Python libraries using the `requirements.txt` file:
```bash
pip install -r requirements.txt
```

### 4. Configure the Database
Create a `.env` file in the backend directory and provide your database credentials in the following format:
```env
DB_NAME=employee_db
DB_USER=<your-mysql-username>
DB_PASSWORD=<your-mysql-password>
DB_HOST=127.0.0.1
DB_PORT=3306
```

### 5. Apply Database Migrations
Run the following commands to apply migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Start the Backend Server
Run the Django development server:
```bash
python manage.py runserver
```
The backend will be available at: `http://127.0.0.1:8000/`

---

## Frontend Setup

### 1. Navigate to the Frontend Folder
```bash
cd frontend
```

### 2. Install Dependencies
Install all required npm packages:
```bash
npm install
```

### 3. Configure API URL
Ensure the frontend is pointing to the backend API. Update the Axios configuration or API URL in your frontend project to use:
```javascript
http://localhost:8000/
```

### 4. Start the Frontend Development Server
Run the React development server:
```bash
npm start
```
The frontend will be available at: `http://localhost:5173/`

---

## Running the Application
1. Start the **backend server** using `python manage.py runserver`.
2. Start the **frontend server** using `npm run dev`.
3. Open your browser and navigate to `http://localhost:5173/` to interact with the application.

---

## Folder Structure
```
project-folder/
├── backend/
│   ├── ...
├── frontend/
│   ├── ...
```

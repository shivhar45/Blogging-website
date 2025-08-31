# 📝 Blogify – Full Stack Blogging Platform

Blogify is a full-stack blogging platform with a **Flask backend** and a **React frontend**.  
Users can register, login, and manage their blogs with categories.  

---

## 🚀 Features
- 🔑 User Authentication (Register / Login / Logout)
- ✍️ Create, Edit, Delete Blogs
- 📂 Categorize Blogs
- 🎨 Responsive UI with modern design
- 🌐 REST API built with Flask

---

## 📂 Project Structure
BLOGGING/
│── backend/ # Flask API
│── frontend/ # React app



---

## ⚙️ Tech Stack
**Frontend:** React, React Router, Bootstrap/Tailwind  
**Backend:** Flask, SQLAlchemy / SQLite / PostgreSQL (choose what you use)  
**Authentication:** JWT / Flask-Login  

---

## 🛠️ Setup & Installation

### 🔹 Backend (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
flask run

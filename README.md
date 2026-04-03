# 🧠 Task Tracker Backend

A production-ready backend system for task management and team collaboration, built with **Node.js, Express, Prisma, and PostgreSQL**.

---

# 🚀 Features

* 🔐 JWT Authentication (Register / Login / Logout)
* 👤 User Profile Management
* 👥 Team & Role-Based Access Control (RBAC)
* 📋 Task Management (CRUD + Filtering + Search)
* 💬 Comments on Tasks
* 📎 File Attachments (Upload/Delete)
* 🔎 Pagination & Search
* 🧪 Unit Testing (Jest)

---

# 🏗️ Architecture Overview

```
Client (Postman / Frontend)
        |
        ▼
     Routes
        |
        ▼
   Controllers
        |
        ▼
    Services (Business Logic)
        |
        ▼
   Prisma ORM
        |
        ▼
   PostgreSQL Database
```

### Key Design Decisions:

* Clean separation: **Routes → Controller → Service**
* Middleware-based authentication & validation
* RBAC enforced at service layer
* Prisma used for type-safe DB access

---

# 🗂️ Project Structure

```
src/
  config/
  middleware/
  modules/
    auth/
    users/
    teams/
    tasks/
    comments/
    attachments/
  utils/
tests/
prisma/
```

---

# ⚙️ Tech Stack

* Node.js + Express
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Zod Validation
* Multer (File Uploads)
* Jest (Testing)

---

# 🚀 How to Run

## 1. Clone Repository

```
git clone https://github.com/Amoghk3/task_tracker_be.git
cd task_tracker_be
```

---

## 2. Install Dependencies

```
npm install
```

---

## 3. Setup Environment

Create `.env` file:

```
DATABASE_URL=postgresql://admin:password@localhost:5432/task_tracker
JWT_SECRET=supersecretkey
PORT=3000
```

---

## 4. Setup Database

```
npx prisma generate
npx prisma migrate dev --name init
```

---

## 5. Run Server

```
npm run dev
```

---

## 6. Access API

```
http://localhost:3000
```

---

# 🔑 Authentication Flow

1. Register user
2. Login → Receive JWT token
3. Use token in headers:

```
Authorization: Bearer <token>
```

---

# 📡 API Endpoints

## 🔐 Auth

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |
| POST   | /api/auth/logout   | Logout user   |

---

## 👤 Users

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/users/me  |
| PATCH  | /api/users/me  |
| GET    | /api/users     |
| GET    | /api/users/:id |

---

## 👥 Teams

| Method | Endpoint               |
| ------ | ---------------------- |
| POST   | /api/teams             |
| GET    | /api/teams/:id         |
| POST   | /api/teams/:id/members |

---

## 📋 Tasks

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /api/tasks            |
| GET    | /api/tasks            |
| PATCH  | /api/tasks/:id        |
| DELETE | /api/tasks/:id        |
| PATCH  | /api/tasks/:id/assign |

---

## 💬 Comments

| Method | Endpoint                    |
| ------ | --------------------------- |
| POST   | /api/tasks/:taskId/comments |
| GET    | /api/tasks/:taskId/comments |
| DELETE | /api/comments/:id           |

---

## 📎 Attachments

| Method | Endpoint                       |
| ------ | ------------------------------ |
| POST   | /api/tasks/:taskId/attachments |
| DELETE | /api/attachments/:id           |

---

# 🧪 Sample Requests

## Register

```json
POST /api/auth/register

{
  "name": "Amogh",
  "email": "amogh@test.com",
  "password": "password123"
}
```

---

## Login

```json
POST /api/auth/login

{
  "email": "amogh@test.com",
  "password": "password123"
}
```

---

## Create Task

```json
POST /api/tasks

{
  "title": "Build API",
  "description": "Complete backend",
  "teamId": "<teamId>",
  "priority": "high"
}
```

---

## Add Comment

```json
POST /api/tasks/{taskId}/comments

{
  "body": "Started working on this"
}
```

---

# 🔐 Security

* Passwords hashed using bcrypt
* JWT-based authentication
* Protected routes using middleware
* RBAC enforced for teams & tasks

---

# 🧪 Testing

```
npm test
```

Includes:

* Unit tests for services
* Mocked Prisma DB

---

# 📈 Future Improvements

* Real-time notifications (WebSockets)
* Redis for caching & token blacklist
* AI-based task description generator
* Activity logs & audit trail

---

# 👨‍💻 Author

Amogh K Sharma

---

# ⭐ Final Note

This project demonstrates:

* Scalable backend architecture
* Secure authentication
* Real-world RBAC system
* Collaboration features

# 🚀 VelSphere Technologies

**Hybrid Manual + Digital System for Internship Management and Project Selling**

[![Status](https://img.shields.io/badge/Status-Operational-success)](http://localhost:5173)
[![Backend](https://img.shields.io/badge/Backend-Running-blue)](http://localhost:8000)
[![Frontend](https://img.shields.io/badge/Frontend-Running-blue)](http://localhost:5173)
[![Database](https://img.shields.io/badge/MongoDB-Connected-green)](mongodb://127.0.0.1:27017/velsphere)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Features](#features)
- [Login Credentials](#login-credentials)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

VelSphere Technologies is a comprehensive internship management platform that enables:

- **Admin Portal**: Complete control over students, internships, tasks, and grading
- **Intern Portal**: Task management, submission, and progress tracking
- **Public Website**: Company information, services, and internship listings

### Key Capabilities

✅ Student Management (CRUD Operations)  
✅ Internship Program Management  
✅ Task Assignment & Tracking  
✅ Submission & Grading System  
✅ Domain-based Organization  
✅ Batch Management  
✅ Real-time Updates  
✅ Secure Authentication (JWT)  

---

## ⚡ Quick Start

### Option 1: Automated Startup (Recommended)

```powershell
.\start.ps1
```

This script will:
1. Check MongoDB status
2. Start backend server (Port 8000)
3. Start frontend server (Port 5173)
4. Open application in browser

### Option 2: Manual Startup

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Admin Dashboard**: http://localhost:5173/dashboard
- **Intern Dashboard**: http://localhost:5173/intern/dashboard

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client Layer                     │
│         React + Vite + TailwindCSS                  │
│              (Port 5173)                            │
└─────────────────────────────────────────────────────┘
                         ↓
                    HTTP/HTTPS
                         ↓
┌─────────────────────────────────────────────────────┐
│                   Server Layer                      │
│            Node.js + Express                        │
│              (Port 8000)                            │
└─────────────────────────────────────────────────────┘
                         ↓
                   Mongoose ODM
                         ↓
┌─────────────────────────────────────────────────────┐
│                 Database Layer                      │
│                  MongoDB                            │
│         (mongodb://127.0.0.1:27017)                 │
└─────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: React 18, Vite, TailwindCSS, Axios, React Router
- **Backend**: Node.js, Express 5, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, CORS, Cookie Parser

---

## 🎨 Features

### Admin Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Student Management** | Create, edit, delete students | ✅ |
| **Internship Management** | Manage internship programs | ✅ |
| **Task Creation** | Create and assign tasks | ✅ |
| **Submission Grading** | Grade intern submissions | ✅ |
| **Domain Management** | Manage technology domains | ✅ |
| **Batch Management** | Organize by batches | ✅ |
| **Analytics Dashboard** | View statistics | ✅ |

### Intern Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Task Viewing** | View assigned tasks | ✅ |
| **Task Submission** | Submit with GitHub + Demo | ✅ |
| **Grade Tracking** | View grades and feedback | ✅ |
| **Progress Tracking** | Monitor completion | ✅ |
| **Password Change** | Update password | ✅ |
| **Profile Management** | View profile info | ✅ |

---

## 🔐 Login Credentials

### Admin Access

**Login URL**: http://localhost:5173/login

```
Email:    admin@velsphere.com
Password: adminpassword123
```

### Intern Access

**Login URL**: http://localhost:5173/intern/login

```
Email:    intern@velsphere.com
Password: internpassword123
```

> **Note**: Interns must change their password on first login.

---

## 📚 Documentation

Comprehensive documentation is available in the following files:

| Document | Description |
|----------|-------------|
| **[TESTING_GUIDE.md](TESTING_GUIDE.md)** | Complete testing guide with all features |
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | Quick reference card for common tasks |
| **[STATUS_REPORT.md](STATUS_REPORT.md)** | Current system status and health |
| **[APPLICATION_FLOW.md](APPLICATION_FLOW.md)** | User journeys and workflows |

---

## 🛠️ Tech Stack

### Frontend Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.22.3",
  "axios": "^1.13.4",
  "lucide-react": "^0.344.0",
  "tailwindcss": "^3.4.1"
}
```

### Backend Dependencies

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.1.6",
  "jsonwebtoken": "^9.0.3",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.2.3",
  "cookie-parser": "^1.4.7"
}
```

---

## 📁 Project Structure

```
VelSphere-Technologies/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── admin/           # Admin-specific components
│   │   │   │   ├── StudentManager.jsx
│   │   │   │   ├── TaskManager.jsx
│   │   │   │   ├── SubmissionManager.jsx
│   │   │   │   ├── InternshipManager.jsx
│   │   │   │   └── DomainManager.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── InternProtectedRoute.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── InternLogin.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── InternDashboard.jsx
│   │   │   └── ChangePassword.jsx
│   │   ├── services/            # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Express Backend
│   ├── config/                  # Configuration files
│   │   └── database.js
│   ├── controllers/             # Route controllers
│   │   ├── admin.controller.js
│   │   ├── student.controller.js
│   │   ├── task.controller.js
│   │   └── ...
│   ├── models/                  # MongoDB models
│   │   ├── admin.model.js
│   │   ├── Student.model.js
│   │   ├── task.model.js
│   │   └── ...
│   ├── routes/                  # API routes
│   │   ├── admin.routes.js
│   │   ├── student.routes.js
│   │   ├── task.routes.js
│   │   └── ...
│   ├── middlewares/             # Custom middleware
│   ├── utils/                   # Utility functions
│   ├── app.js                   # Express app setup
│   ├── server.js                # Server entry point
│   ├── seed.js                  # Admin seeder
│   └── package.json
│
├── docs/                        # Documentation
├── scripts/                     # Utility scripts
├── start.ps1                    # Startup script
├── TESTING_GUIDE.md             # Testing guide
├── QUICK_REFERENCE.md           # Quick reference
├── STATUS_REPORT.md             # Status report
├── APPLICATION_FLOW.md          # Flow diagrams
└── README.md                    # This file
```

---

## 🔌 API Endpoints

### Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/admin/login` | Admin login |
| POST | `/api/v1/admin/logout` | Admin logout |
| GET | `/api/v1/admin/current` | Get current admin |
| GET | `/api/v1/students` | Get all students |
| POST | `/api/v1/students` | Create student |
| PUT | `/api/v1/students/:id` | Update student |
| DELETE | `/api/v1/students/:id` | Delete student |
| POST | `/api/v1/tasks/create` | Create task |
| GET | `/api/v1/tasks/all` | Get all tasks |
| PUT | `/api/v1/tasks/:id/grade` | Grade task |

### Intern Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/students/login` | Intern login |
| POST | `/api/v1/students/logout` | Intern logout |
| GET | `/api/v1/students/current` | Get current intern |
| PUT | `/api/v1/students/change-password` | Change password |
| GET | `/api/v1/tasks/my-tasks` | Get assigned tasks |
| POST | `/api/v1/tasks/:id/submit` | Submit task |

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/internships` | Get all internships |
| GET | `/api/v1/domains` | Get all domains |
| POST | `/api/v1/applications` | Submit application |
| POST | `/api/v1/contacts` | Submit contact form |

---

## 💻 Development

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VelSphere-Technologies
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Create `.env` file in `server/` directory:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://127.0.0.1:27017/velsphere
   CORS_ORIGIN=http://localhost:5173
   ACCESS_TOKEN_SECRET=velsphere-secret-key-123
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=velsphere-refresh-secret-key-123
   REFRESH_TOKEN_EXPIRY=10d
   ```

5. **Seed the database**
   ```bash
   cd server
   node seed.js              # Create admin
   node seed_students.js     # Create test intern
   node seed_internships.js  # Create sample internships
   ```

6. **Start the application**
   ```bash
   # Use startup script
   .\start.ps1
   
   # OR manually
   cd server && npm start
   cd client && npm run dev
   ```

---

## 🐛 Troubleshooting

### MongoDB Not Running

```powershell
# Check status
Get-Service -Name MongoDB

# Start service
Start-Service -Name MongoDB
```

### Port Already in Use

```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Import Errors

All import paths have been fixed. If you encounter import errors:
- Clear node_modules: `rm -r node_modules`
- Reinstall: `npm install`
- Restart dev server

### Database Connection Issues

1. Ensure MongoDB is running
2. Check connection string in `.env`
3. Verify database name is correct
4. Check firewall settings

---

## 🎯 Testing Workflow

### Complete Test Cycle

1. **Start Servers**
   ```bash
   .\start.ps1
   ```

2. **Test Admin Login**
   - Navigate to http://localhost:5173/login
   - Login with admin credentials
   - Verify dashboard loads

3. **Create Student**
   - Go to Students tab
   - Add new student
   - Copy credentials

4. **Create Task**
   - Go to Tasks tab
   - Create new task
   - Assign to domain

5. **Test Intern Login**
   - Navigate to http://localhost:5173/intern/login
   - Login with intern credentials
   - Change password if first login

6. **Submit Task**
   - View assigned tasks
   - Submit task with links
   - Verify submission

7. **Grade Task**
   - Login as admin
   - Go to Submissions
   - Grade the task

8. **Verify Grade**
   - Login as intern
   - Check graded tasks
   - View feedback

---

## 📊 Database Schema

### Collections

1. **admins** - Admin user accounts
2. **students** - Student/Intern accounts
3. **internships** - Internship programs
4. **tasks** - Task assignments
5. **domains** - Technology domains
6. **applications** - Internship applications
7. **projects** - Company projects
8. **contacts** - Contact form submissions

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes (frontend & backend)
- ✅ CORS configuration
- ✅ HTTP-only cookies
- ✅ Token refresh mechanism
- ✅ Input validation
- ✅ Error handling

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1920px+)
- Laptop (1366px+)
- Tablet (768px+)
- Mobile (375px+)

---

## 🚀 Deployment

### Production Build

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

### Environment Variables (Production)

Update `.env` with production values:
- Use secure secrets
- Update CORS origin
- Use production MongoDB URI
- Enable HTTPS

---

## 📞 Support

For issues, questions, or contributions:

1. Check documentation files
2. Review troubleshooting section
3. Check console for errors
4. Verify all services are running

---

## 📄 License

This project is proprietary software developed for VelSphere Technologies.

---

## 👥 Contributors

Developed and maintained by the VelSphere Technologies team.

---

## 🎉 Status

**✅ FULLY OPERATIONAL**

- Backend: Running on port 8000
- Frontend: Running on port 5173
- Database: Connected to MongoDB
- All features: Working correctly

**Last Updated**: February 7, 2026

---

**Ready to start? Run `.\start.ps1` and begin testing! 🚀**

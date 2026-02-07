# 🚀 VelSphere Technologies - Quick Reference

## ⚡ Quick Start

### Option 1: Using Startup Script (Recommended)
```powershell
.\start.ps1
```

### Option 2: Manual Start
```powershell
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend  
cd client
npm run dev
```

---

## 🔐 Login Credentials

### Admin Access
- **URL**: http://localhost:5173/login
- **Email**: `admin@velsphere.com`
- **Password**: `adminpassword123`

### Intern Access
- **URL**: http://localhost:5173/intern/login
- **Email**: `intern@velsphere.com`
- **Password**: `internpassword123`

---

## 📍 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Admin Dashboard | http://localhost:5173/dashboard |
| Intern Dashboard | http://localhost:5173/intern/dashboard |

---

## 🎯 Key Features

### Admin Dashboard
- ✅ Student Management (Create, Edit, Delete)
- ✅ Internship Management
- ✅ Task Assignment
- ✅ Submission Grading
- ✅ Domain Management

### Intern Dashboard
- ✅ View Assigned Tasks
- ✅ Submit Tasks (GitHub + Live Demo)
- ✅ View Grades & Feedback
- ✅ Track Progress
- ✅ Change Password

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT

---

## 📁 Project Structure

```
VelSphere-Technologies/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   └── package.json
├── server/              # Express Backend
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── package.json
├── start.ps1           # Startup script
├── TESTING_GUIDE.md    # Detailed testing guide
└── README.md
```

---

## 🔧 Troubleshooting

### MongoDB Not Running
```powershell
Start-Service -Name MongoDB
```

### Port Already in Use
```powershell
# Check what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Clear Cache & Restart
```powershell
# In client directory
npm run build
rm -r node_modules
npm install
npm run dev
```

---

## 📝 Common Tasks

### Create New Admin
```bash
cd server
node seed.js
```

### Create Test Intern
```bash
cd server
node seed_students.js
```

### Create Sample Internships
```bash
cd server
node seed_internships.js
```

---

## 🎨 API Endpoints

### Admin Routes
- `POST /api/v1/admin/login` - Admin login
- `GET /api/v1/students` - Get all students
- `POST /api/v1/students` - Create student
- `POST /api/v1/tasks/create` - Create task
- `PUT /api/v1/tasks/:id/grade` - Grade task

### Intern Routes
- `POST /api/v1/students/login` - Intern login
- `GET /api/v1/tasks/my-tasks` - Get my tasks
- `POST /api/v1/tasks/:id/submit` - Submit task
- `PUT /api/v1/students/change-password` - Change password

---

## ✨ Tips

1. **First Login**: Interns must change password on first login
2. **Task Submission**: Include both GitHub repo and live demo URLs
3. **Grading**: Admin can grade tasks from 0-100
4. **Filtering**: Use domain and batch filters in admin dashboard
5. **Logout**: Always logout to test session management

---

## 📞 Support

For issues or questions, refer to:
- `TESTING_GUIDE.md` - Comprehensive testing guide
- `README.md` - Project documentation

---

**Last Updated**: February 7, 2026

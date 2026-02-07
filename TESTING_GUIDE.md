# 🚀 VelSphere Technologies - Complete Testing Guide

## ✅ Server Status

### Backend Server
- **Status**: ✅ RUNNING
- **URL**: http://localhost:8000
- **Database**: MongoDB (velsphere)
- **Connection**: 127.0.0.1

### Frontend Server
- **Status**: ✅ RUNNING
- **URL**: http://localhost:5173
- **Framework**: React + Vite

---

## 🔐 Login Credentials

### 1. Admin Login
- **Login URL**: http://localhost:5173/login
- **Email**: `admin@velsphere.com`
- **Password**: `adminpassword123`
- **Dashboard**: http://localhost:5173/dashboard

### 2. Intern Login
- **Login URL**: http://localhost:5173/intern/login
- **Email**: `intern@velsphere.com`
- **Password**: `internpassword123`
- **Dashboard**: http://localhost:5173/intern/dashboard

---

## 📋 Complete Testing Workflow

### Step 1: Test Admin Login & Dashboard

1. **Navigate to Admin Login**
   - Open browser: http://localhost:5173/login
   - Enter credentials:
     - Email: `admin@velsphere.com`
     - Password: `adminpassword123`
   - Click "Login"

2. **Admin Dashboard Features**
   - **Student Management**
     - View all students
     - Add new students
     - Edit student details
     - Delete students
     - Filter by domain/batch
   
   - **Internship Management**
     - Create internship programs
     - View all internships
     - Edit internship details
     - Manage internship status
   
   - **Task Management**
     - Assign tasks to interns
     - View task submissions
     - Grade tasks
     - Provide feedback
   
   - **Domain Management**
     - Add new domains
     - View all domains
     - Edit domain information

3. **Test Admin Workflows**
   - Create a new student
   - Assign an internship
   - Create and assign a task
   - Review task submissions

---

### Step 2: Test Intern Login & Dashboard

1. **Navigate to Intern Login**
   - Open browser: http://localhost:5173/intern/login
   - Enter credentials:
     - Email: `intern@velsphere.com`
     - Password: `internpassword123`
   - Click "Login"

2. **First Login (Password Change)**
   - If it's the first login, you'll be redirected to change password
   - Enter new password
   - Confirm password
   - Submit

3. **Intern Dashboard Features**
   - **Profile Section**
     - View personal information
     - See assigned domain
     - Check batch information
     - View internship status
   
   - **Tasks Section**
     - View assigned tasks
     - See task deadlines
     - Check task status (pending/submitted/graded)
     - View grades and feedback
   
   - **Task Submission**
     - Click on a task
     - Enter submission details
     - Add GitHub repository link
     - Add live demo link
     - Submit task
   
   - **Progress Tracking**
     - View completed tasks
     - See pending tasks
     - Check overall progress

4. **Test Intern Workflows**
   - Change password (if first login)
   - View assigned tasks
   - Submit a task
   - Check grades and feedback

---

## 🧪 API Testing Endpoints

### Admin Endpoints
```
POST   /api/v1/admin/login              - Admin login
POST   /api/v1/admin/logout             - Admin logout
GET    /api/v1/admin/current            - Get current admin

POST   /api/v1/students                 - Create student
GET    /api/v1/students                 - Get all students
GET    /api/v1/students/:id             - Get student by ID
PUT    /api/v1/students/:id             - Update student
DELETE /api/v1/students/:id             - Delete student

POST   /api/v1/internships              - Create internship
GET    /api/v1/internships              - Get all internships
GET    /api/v1/internships/:id          - Get internship by ID
PUT    /api/v1/internships/:id          - Update internship
DELETE /api/v1/internships/:id          - Delete internship

POST   /api/v1/tasks                    - Create task
GET    /api/v1/tasks                    - Get all tasks
PUT    /api/v1/tasks/:id/grade          - Grade task
```

### Intern Endpoints
```
POST   /api/v1/students/login           - Intern login
POST   /api/v1/students/logout          - Intern logout
GET    /api/v1/students/current         - Get current intern
PUT    /api/v1/students/change-password - Change password

GET    /api/v1/tasks/my-tasks           - Get assigned tasks
POST   /api/v1/tasks/:id/submit         - Submit task
GET    /api/v1/tasks/:id                - Get task details
```

---

## 🎯 Feature Checklist

### Admin Features
- [ ] Login with admin credentials
- [ ] View admin dashboard
- [ ] Create new student
- [ ] Edit student details
- [ ] Delete student
- [ ] Create internship program
- [ ] Assign internship to student
- [ ] Create task
- [ ] Assign task to intern
- [ ] Grade task submission
- [ ] Provide feedback on tasks
- [ ] View all domains
- [ ] Add new domain
- [ ] Logout

### Intern Features
- [ ] Login with intern credentials
- [ ] Change password on first login
- [ ] View personal profile
- [ ] See assigned tasks
- [ ] Submit task with links
- [ ] View task grades
- [ ] Read feedback
- [ ] Track progress
- [ ] Logout

---

## 🔧 Troubleshooting

### Backend Issues
If backend is not running:
```bash
cd server
npm start
```

### Frontend Issues
If frontend is not running:
```bash
cd client
npm run dev
```

### Database Issues
Check MongoDB service:
```powershell
Get-Service -Name MongoDB
```

Start MongoDB if stopped:
```powershell
Start-Service -Name MongoDB
```

### Seed Data
If you need to reset or create seed data:

**Create Admin:**
```bash
cd server
node seed.js
```

**Create Test Intern:**
```bash
cd server
node seed_students.js
```

**Create Test Internships:**
```bash
cd server
node seed_internships.js
```

---

## 📱 Application Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/services` - Services page
- `/internships` - Internships listing
- `/careers` - Careers page
- `/projects` - Projects page
- `/contact` - Contact page

### Admin Routes (Protected)
- `/login` - Admin login
- `/dashboard` - Admin dashboard

### Intern Routes (Protected)
- `/intern/login` - Intern login
- `/intern/dashboard` - Intern dashboard
- `/intern/change-password` - Change password

---

## 🎨 UI/UX Features

### Design Elements
- Modern, responsive design
- Dark mode support
- Smooth animations
- Interactive components
- Mobile-friendly layout

### User Experience
- Intuitive navigation
- Clear feedback messages
- Loading states
- Error handling
- Form validation

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

## 🚀 Quick Start Commands

### Start Everything
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

### Access Application
1. Open browser: http://localhost:5173
2. Test admin login: http://localhost:5173/login
3. Test intern login: http://localhost:5173/intern/login

---

## ✨ Best Practices

1. **Always logout** after testing to ensure session management works
2. **Test on different browsers** (Chrome, Firefox, Edge)
3. **Check console** for any errors
4. **Verify API responses** in Network tab
5. **Test responsive design** on different screen sizes
6. **Clear cookies** if experiencing login issues

---

## 📝 Notes

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Sessions expire after 1 day (access token)
- Refresh tokens expire after 10 days
- CORS is configured for http://localhost:5173

---

## 🎉 Success Criteria

Your application is working perfectly if:
- ✅ Both servers start without errors
- ✅ Admin can login and access dashboard
- ✅ Intern can login and access dashboard
- ✅ Admin can create/edit/delete students
- ✅ Admin can create and assign tasks
- ✅ Intern can view and submit tasks
- ✅ Admin can grade task submissions
- ✅ All API endpoints respond correctly
- ✅ UI is responsive and interactive
- ✅ No console errors

---

**Happy Testing! 🚀**

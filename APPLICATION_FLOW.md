# 🎯 VelSphere Technologies - Application Flow Guide

## 📋 Table of Contents
1. [Admin Workflow](#admin-workflow)
2. [Intern Workflow](#intern-workflow)
3. [Complete Task Cycle](#complete-task-cycle)
4. [User Journey Maps](#user-journey-maps)

---

## 🔵 Admin Workflow

### 1. Login Process
```
┌─────────────────────────────────────────┐
│  http://localhost:5173/login            │
├─────────────────────────────────────────┤
│  Email: admin@velsphere.com             │
│  Password: adminpassword123             │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Admin Dashboard                        │
│  http://localhost:5173/dashboard        │
└─────────────────────────────────────────┘
```

### 2. Student Management Flow
```
Admin Dashboard
    ↓
[Student Manager Tab]
    ↓
┌─────────────────────────────────────────┐
│ Actions Available:                      │
│  • View All Students                    │
│  • Add New Student                      │
│  • Edit Student Details                 │
│  • Delete Student                       │
│  • Filter by Domain/Batch               │
│  • Copy Student Credentials             │
└─────────────────────────────────────────┘
```

### 3. Task Creation Flow
```
Admin Dashboard
    ↓
[Task Manager Tab]
    ↓
[Post New Task Button]
    ↓
┌─────────────────────────────────────────┐
│ Fill Task Details:                      │
│  • Task Title                           │
│  • Description/Instructions             │
│  • Assign to Domain                     │
│  • Target Batch (Optional)              │
│  • Deadline Date                        │
└─────────────────────────────────────────┘
    ↓
[Publish Task]
    ↓
✅ Task Assigned to All Interns in Domain
```

### 4. Grading Flow
```
Admin Dashboard
    ↓
[Submissions Tab]
    ↓
[View Submission]
    ↓
┌─────────────────────────────────────────┐
│ Review Submission:                      │
│  • View GitHub Repository               │
│  • Check Live Demo                      │
│  • Read Intern's Notes                  │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ Grade Submission:                       │
│  • Enter Grade (0-100)                  │
│  • Write Feedback                       │
│  • Submit Grade                         │
└─────────────────────────────────────────┘
    ↓
✅ Intern Receives Grade & Feedback
```

---

## 🟢 Intern Workflow

### 1. Login Process
```
┌─────────────────────────────────────────┐
│  http://localhost:5173/intern/login     │
├─────────────────────────────────────────┤
│  Email: intern@velsphere.com            │
│  Password: internpassword123            │
└─────────────────────────────────────────┘
                    ↓
         [First Login Check]
                    ↓
        ┌───────────┴───────────┐
        │                       │
   First Login            Returning User
        │                       │
        ↓                       ↓
┌──────────────┐      ┌──────────────────┐
│ Change       │      │ Intern Dashboard │
│ Password     │      └──────────────────┘
└──────────────┘
        ↓
┌──────────────────┐
│ Intern Dashboard │
└──────────────────┘
```

### 2. Task Viewing Flow
```
Intern Dashboard
    ↓
┌─────────────────────────────────────────┐
│ View Tasks:                             │
│  • Pending Tasks                        │
│  • Submitted Tasks                      │
│  • Graded Tasks                         │
└─────────────────────────────────────────┘
    ↓
[Click on Task]
    ↓
┌─────────────────────────────────────────┐
│ Task Details:                           │
│  • Title                                │
│  • Description                          │
│  • Deadline                             │
│  • Status                               │
│  • Grade (if graded)                    │
│  • Feedback (if graded)                 │
└─────────────────────────────────────────┘
```

### 3. Task Submission Flow
```
Intern Dashboard
    ↓
[Select Pending Task]
    ↓
[Submit Task Button]
    ↓
┌─────────────────────────────────────────┐
│ Submission Form:                        │
│  • GitHub Repository URL                │
│  • Live Demo URL                        │
│  • Additional Notes (Optional)          │
└─────────────────────────────────────────┘
    ↓
[Submit]
    ↓
✅ Task Marked as Submitted
    ↓
⏳ Waiting for Admin to Grade
```

### 4. Grade Viewing Flow
```
Intern Dashboard
    ↓
[View Graded Tasks]
    ↓
┌─────────────────────────────────────────┐
│ Graded Task Details:                    │
│  • Task Title                           │
│  • Your Submission                      │
│  • Grade: XX/100                        │
│  • Feedback from Admin                  │
│  • Submission Date                      │
│  • Graded Date                          │
└─────────────────────────────────────────┘
```

---

## 🔄 Complete Task Cycle

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPLETE TASK LIFECYCLE                  │
└─────────────────────────────────────────────────────────────┘

1. ADMIN: Create Task
   ├─ Define task details
   ├─ Assign to domain
   ├─ Set deadline
   └─ Publish
          ↓
2. SYSTEM: Auto-assign to Interns
   └─ All interns in selected domain receive task
          ↓
3. INTERN: View Task
   ├─ Read instructions
   ├─ Note deadline
   └─ Start working
          ↓
4. INTERN: Complete Work
   ├─ Build project
   ├─ Push to GitHub
   ├─ Deploy live demo
   └─ Prepare submission
          ↓
5. INTERN: Submit Task
   ├─ Enter GitHub URL
   ├─ Enter Live Demo URL
   ├─ Add notes
   └─ Submit
          ↓
6. ADMIN: Review Submission
   ├─ Check GitHub code
   ├─ Test live demo
   └─ Evaluate quality
          ↓
7. ADMIN: Grade Task
   ├─ Assign grade (0-100)
   ├─ Write feedback
   └─ Submit grade
          ↓
8. INTERN: View Grade
   ├─ See score
   ├─ Read feedback
   └─ Learn & improve
          ↓
✅ TASK CYCLE COMPLETE
```

---

## 👤 User Journey Maps

### Admin Journey
```
START → Login → Dashboard → Choose Action
                                  ↓
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
   Manage Students          Create Tasks            Grade Submissions
        │                         │                         │
        ↓                         ↓                         ↓
  • Add Student            • Fill Details          • Review Work
  • Edit Details           • Assign Domain         • Enter Grade
  • Delete Student         • Set Deadline          • Give Feedback
  • View List              • Publish               • Submit
        │                         │                         │
        └─────────────────────────┼─────────────────────────┘
                                  ↓
                              Logout
                                  ↓
                                END
```

### Intern Journey
```
START → Login → Change Password (First Time) → Dashboard
                                                     ↓
                        ┌────────────────────────────┼────────────────┐
                        │                            │                │
                  View Tasks                   Submit Task      View Grades
                        │                            │                │
                        ↓                            ↓                ↓
                  • Pending                    • Add GitHub      • See Score
                  • Submitted                  • Add Demo        • Read Feedback
                  • Graded                     • Add Notes       • Track Progress
                        │                            │                │
                        └────────────────────────────┼────────────────┘
                                                     ↓
                                                 Logout
                                                     ↓
                                                   END
```

---

## 🎯 Key Interaction Points

### 1. Authentication
```
┌──────────────────────────────────────────┐
│ JWT Token-based Authentication          │
├──────────────────────────────────────────┤
│ • Access Token: 1 day validity           │
│ • Refresh Token: 10 days validity        │
│ • Stored in: localStorage + httpOnly     │
│ • Auto-refresh on API calls              │
└──────────────────────────────────────────┘
```

### 2. Data Flow
```
Frontend (React)
      ↓
   API Call (axios)
      ↓
Backend (Express)
      ↓
  Controller
      ↓
   Model
      ↓
MongoDB Database
      ↓
   Response
      ↓
Frontend Update
```

### 3. Real-time Updates
```
Action Performed
      ↓
API Request
      ↓
Database Update
      ↓
Response Received
      ↓
State Update (React)
      ↓
UI Re-render
      ↓
User Sees Change
```

---

## 📊 Feature Matrix

| Feature | Admin | Intern |
|---------|-------|--------|
| Login | ✅ | ✅ |
| Dashboard | ✅ | ✅ |
| View Students | ✅ | ❌ |
| Create Students | ✅ | ❌ |
| Edit Students | ✅ | ❌ |
| Delete Students | ✅ | ❌ |
| Create Tasks | ✅ | ❌ |
| View Tasks | ✅ | ✅ |
| Submit Tasks | ❌ | ✅ |
| Grade Tasks | ✅ | ❌ |
| View Grades | ✅ | ✅ |
| Manage Domains | ✅ | ❌ |
| Change Password | ✅ | ✅ |
| View Profile | ✅ | ✅ |

---

## 🎨 UI Components

### Admin Dashboard Tabs
1. **Overview** - Statistics and summary
2. **Students** - Student management
3. **Internships** - Internship programs
4. **Tasks** - Task creation and management
5. **Submissions** - Grade submissions
6. **Domains** - Domain management

### Intern Dashboard Sections
1. **Profile** - Personal information
2. **Tasks** - Assigned tasks
3. **Submissions** - Submitted work
4. **Grades** - Graded tasks with feedback
5. **Progress** - Overall progress tracking

---

## 🚀 Quick Actions

### For Admins
```
Quick Action              Shortcut Path
─────────────────────────────────────────
Add Student          →    Dashboard → Students → Add
Create Task          →    Dashboard → Tasks → Post New
Grade Submission     →    Dashboard → Submissions → Grade
Add Domain           →    Dashboard → Domains → Add
```

### For Interns
```
Quick Action              Shortcut Path
─────────────────────────────────────────
View Tasks           →    Dashboard → Tasks
Submit Task          →    Dashboard → Task → Submit
View Grades          →    Dashboard → Grades
Change Password      →    Profile → Change Password
```

---

## ✨ Best Practices

### For Admins
1. ✅ Create domains before adding students
2. ✅ Assign clear, detailed task descriptions
3. ✅ Set realistic deadlines
4. ✅ Provide constructive feedback when grading
5. ✅ Regularly review submissions

### For Interns
1. ✅ Change password on first login
2. ✅ Read task instructions carefully
3. ✅ Submit before deadline
4. ✅ Include working links (GitHub + Demo)
5. ✅ Add notes to explain your work

---

**This guide provides a complete overview of the application flow and user journeys.**
**Use it as a reference when testing or demonstrating the application.**

---

**Last Updated**: February 7, 2026

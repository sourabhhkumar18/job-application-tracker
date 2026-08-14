# 💼 Job Application Tracker (MERN Stack)

A modern, full-stack Job Application Tracker designed to help developers and job seekers organize, track, and manage their job applications efficiently with real-time status updates and metrics.

---

## 🚀 Live Demo

- **Frontend App:** [Live on Vercel](https://<YOUR-VERCEL-APP-URL>.vercel.app)
- **Backend API:** [Live on Render](https://job-application-tracker-slep.onrender.com)

---

## ✨ Features

- **User Authentication & Authorization:** Secure user registration and login using **JWT (JSON Web Tokens)** and **Bcrypt** password hashing.
- **Protected Routes:** User-specific application data isolation; users can only view, create, edit, and delete their own job applications.
- **CRUD Operations:** Full Create, Read, Update, and Delete functionality for job records.
- **Real-Time Analytics & Dashboard Metrics:** Dynamic overview showing total applications, active interviews, and offers received.
- **Search & Filtering:** Fast client-side searching by company name or role, and filtering by application status (*Applied, Screening, Interview, Offer, Rejected*).
- **Responsive UI/UX:** Clean, dark-mode-first modern interface built with **Tailwind CSS** and **Lucide React Icons**.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **Axios** (API Client with Request Interceptors)
- **React Router DOM** (Client-side routing)
- **Lucide React** (Icons)

### Backend
- **Node.js** & **Express.js** (REST API Architecture)
- **MongoDB Atlas** & **Mongoose** (Database & ODM)
- **JSON Web Tokens (JWT)** (Stateless Authentication)
- **Bcrypt.js** (Password Encryption)
- **CORS** & **Dotenv**

### Deployment & DevOps
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database Hosting:** MongoDB Atlas Cloud

---

## 📂 Project Structure

```text
job-application-tracker/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route logic for auth and jobs
│   ├── middleware/      # JWT authentication middleware
│   ├── models/          # Mongoose schemas (User, Job)
│   ├── routes/          # API endpoint routes
│   └── server.js        # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # Navbar, ProtectedRoute, UI modals
    │   ├── context/     # AuthContext state management
    │   ├── pages/       # Login, Register, Dashboard
    │   ├── services/    # Axios API client setup
    │   ├── App.jsx      # App routing
    │   └── main.jsx     # Vite DOM mounting & Tailwind entry
    └── vercel.json      # Client-side routing configuration
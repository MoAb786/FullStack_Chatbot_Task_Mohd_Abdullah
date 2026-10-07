# DroneTV AI Support & Lead Assistant Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20%2F%207.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.2-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209.1-green.svg)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)

A full-stack, enterprise-grade web application built for the **IPAGE Group Full Stack Developer Intern Practical Assessment**. The platform delivers a responsive aviation training and UAV services experience, featuring an interactive deterministic rule-based chatbot, lead capture workflows, a secure Node.js/Express REST API, and a protected Admin Enquiry Dashboard with full CRUD capabilities.

---

## 1. Project Overview & Features

### Public Frontend
- **Landing / Home Page (`/`)**: Hero section with CTAs, live key metrics, interactive services and DGCA courses preview, trust badges, and quick assistant trigger.
- **Enterprise Services (`/services`)**: Detailed catalog covering Aerial Cinematography & FPV, GIS Mapping & 3D Photogrammetry, Precision Agriculture, and Infrastructure Inspection with category filters and quote booking CTAs.
- **DGCA Training Academy (`/courses`)**: Comprehensive course catalog with syllabus breakdown, duration, eligibility, and 15% student discount concession banner.
- **Lead / Enquiry Form (`/contact`)**: Zod-validated submission form capturing Name, Email, Phone, User Type (`Student | Customer | Other`), Area of Interest, and Message, with URL query parameter auto-fill support (`?interest=...`).
- **Interactive Chatbot Interface (`/chat` & Global Floating Widget)**:
  - Answers predefined domain questions (services, DGCA licensing, fees, student concessions, contact info, representative callback).
  - Quick-reply suggestion pills.
  - Maintains conversation history across the browser session (`sessionStorage`).
  - Graceful fallback for unknown/unmatched queries.
  - Clear / reset conversation capability.
  - Direct CTA button within chat to navigate to the enquiry form with pre-filled interest.

### Admin Portal & Dashboard (`/admin`)
- **JWT-Protected Access (`/admin/login`)**: Secure login with Bearer token authentication and evaluation auto-fill helper.
- **Live Metric Statistics**: Total Enquiries, New Leads, Contacted, In Progress, and Closed/Enrolled counts.
- **Search & Multi-Filtering**: Search across name, email, phone, interest, and message; filter dynamically by User Type and Status.
- **Enquiry Detail Modal**: Comprehensive inspection of candidate details, timestamps, and direct "Reply by Email" / "Call" actions.
- **Enquiry Status Workflow**: Real-time status transitions (`New` ➔ `Contacted` ➔ `In Progress` ➔ `Closed`).
- **Secure Deletion**: Double-confirmation dialog before permanently deleting records.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Bundler & Tooling** | Vite 8 + PostCSS / Tailwind CSS v4 |
| **Routing** | React Router v7 |
| **Form Management** | React Hook Form + Zod v4 Resolvers |
| **Icons & Typography** | Geist Sans, JetBrains Mono, Material Symbols Outlined |
| **Backend Framework** | Node.js + Express.js 5 + TypeScript |
| **Database & ODM** | MongoDB + Mongoose 9 |
| **Security & Auth** | JWT (jsonwebtoken), Helmet, CORS, Sanitization |
| **Chatbot Engine** | Deterministic Local Rule-Based Intent Matcher (No external LLM API dependency) |

---

## 3. Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────┐
│               Frontend (React + Vite)                  │
│  - Home, Services, Courses, Contact, Chatbot Widget    │
│  - Protected Admin Dashboard (JWT in LocalStorage)     │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
       POST /api/enquiries        GET/PATCH/DELETE
       (Public Lead Capture)       (Protected with Bearer Token)
                │                        │
                ▼                        ▼
┌────────────────────────────────────────────────────────┐
│               Backend (Express + Node.js)              │
│  - Helmet Security & CORS Protection                   │
│  - Zod Input Validation Middleware                     │
│  - JWT Authorization & Centralized Error Handler       │
└───────────────────────┬────────────────────────────────┘
                        │
                  Mongoose ODM
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│                   MongoDB Database                     │
│  - Enquiries Collection (Indexed by Status, UserType)  │
└────────────────────────────────────────────────────────┘
```

---

## 4. Project Folder Structure

```text
FullStack_Chatbot_Task_Mohd_Abdullah/
├── .env.example
├── .gitignore
├── README.md
├── DESIGN.md
├── IPAGE_Group_FullStack_Intern_Assignment.pdf
│
├── client/                               # Frontend Application
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── types/index.ts                # Shared TypeScript interfaces
│       ├── lib/api.ts                    # Typed API client & JWT storage
│       ├── data/chatbot.ts               # Predefined chat intents & matcher
│       ├── components/
│       │   ├── layout/Navbar.tsx
│       │   ├── layout/Footer.tsx
│       │   ├── chatbot/ChatbotWidget.tsx # Floating interactive assistant
│       │   └── admin/                    # StatusBadge, DetailModal, DeleteModal
│       └── pages/
│           ├── Home.tsx
│           ├── Services.tsx
│           ├── Courses.tsx
│           ├── Contact.tsx
│           ├── Chat.tsx
│           ├── AdminLogin.tsx
│           └── AdminDashboard.tsx
│
└── server/                               # Backend REST API
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── app.ts                        # Express application setup
        ├── server.ts                     # Server listener entry point
        ├── config/db.ts                  # Mongoose MongoDB connection
        ├── types/index.ts
        ├── models/enquiry.model.ts       # Mongoose Schema & Indexes
        ├── schemas/                      # Zod validation schemas
        │   ├── auth.schema.ts
        │   └── enquiry.schema.ts
        ├── middleware/
        │   ├── auth.middleware.ts        # JWT validation
        │   ├── validate.middleware.ts    # Zod request validation
        │   ├── notFound.middleware.ts    # 404 handler
        │   └── error.middleware.ts       # Safe centralized error handler
        ├── controllers/
        │   ├── auth.controller.ts
        │   └── enquiry.controller.ts
        ├── routes/
        │   ├── auth.routes.ts
        │   └── enquiry.routes.ts
        └── scripts/
            └── seed.ts                   # Demo dataset seeder
```

---

## 5. Environment Variables & Setup

### Prerequisites
- **Node.js**: v18.0 or newer
- **npm**: v9.0 or newer
- **MongoDB**: Local instance (`mongodb://127.0.0.1:27017`) or free cloud cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)

### Backend Configuration (`server/.env`)
Create `server/.env` based on `server/.env.example`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/dronetv
CLIENT_URL=http://localhost:5173
JWT_SECRET=supersecretjwtkey_dronetv_intern_2026_change_in_production
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=admin@dronetv.in
ADMIN_PASSWORD=Admin@DroneTV2026
```

### Frontend Configuration (`client/.env`)
Create `client/.env` based on `client/.env.example`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 6. How to Run Locally

### 1. Start Backend Server
```bash
cd server
npm install
npm run seed     # (Optional) Seed realistic sample enquiries for instant dashboard data
npm run dev      # Starts server on http://localhost:5000 with hot reload
```

### 2. Start Frontend Client
```bash
cd client
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

### 3. Open Application
- Public Web App: `http://localhost:5173`
- Chatbot Assistant: `http://localhost:5173/chat`
- Admin Portal: `http://localhost:5173/admin/login`
  - **Email**: `admin@dronetv.in`
  - **Password**: `Admin@DroneTV2026`

---

## 7. REST API Documentation

Base URL: `http://localhost:5000/api`

### Endpoints Summary

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Health check & server status |
| `POST` | `/api/auth/login` | Public | Admin login & JWT generation |
| `GET` | `/api/auth/me` | Admin (JWT) | Current admin profile |
| `POST` | `/api/enquiries` | Public | Submit new lead / course enquiry |
| `GET` | `/api/enquiries` | Admin (JWT) | List enquiries with search & filter |
| `GET` | `/api/enquiries/stats` | Admin (JWT) | Aggregated status counts for metrics |
| `GET` | `/api/enquiries/:id` | Admin (JWT) | Get single enquiry details |
| `PATCH` | `/api/enquiries/:id` | Admin (JWT) | Update status or enquiry fields |
| `DELETE` | `/api/enquiries/:id` | Admin (JWT) | Delete enquiry record |

### Sample Requests & Responses

#### 1. Create Enquiry (`POST /api/enquiries`)
**Request Body:**
```json
{
  "name": "Aarav Sharma",
  "email": "aarav.sharma@example.com",
  "phone": "+91 9876543210",
  "userType": "Student",
  "interest": "DGCA Remote Pilot Certification (Small Category)",
  "message": "Interested in joining the upcoming weekend batch. Please share details on fee concessions."
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Your enquiry has been received successfully! Our team will contact you shortly.",
  "data": {
    "_id": "67039a8f219c4d92a10b1234",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "phone": "+91 9876543210",
    "userType": "Student",
    "interest": "DGCA Remote Pilot Certification (Small Category)",
    "message": "Interested in joining the upcoming weekend batch...",
    "status": "New",
    "createdAt": "2026-10-07T15:00:00.000Z",
    "updatedAt": "2026-10-07T15:00:00.000Z"
  }
}
```

#### 2. Query Enquiries with Filters (`GET /api/enquiries?search=sharma&userType=Student&status=New`)
**Headers:** `Authorization: Bearer <token>`

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "67039a8f219c4d92a10b1234",
      "name": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "phone": "+91 9876543210",
      "userType": "Student",
      "interest": "DGCA Remote Pilot Certification (Small Category)",
      "status": "New",
      "createdAt": "2026-10-07T15:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 50,
    "totalPages": 1
  }
}
```

#### 3. Update Enquiry Status (`PATCH /api/enquiries/:id`)
**Headers:** `Authorization: Bearer <token>`
```json
{
  "status": "Contacted"
}
```

---

## 8. Security & Error Handling

- **Defense in Depth Validation**: Strict schemas on both frontend and backend using Zod.
- **Sanitized Responses**: No database connection strings, stack traces, or raw exceptions exposed to the client.
- **CORS & Helmet**: Protected headers, rate-friendly request parsing limits (100kb).
- **Environment Isolation**: `.env` files ignored by git; `.env.example` templates committed.
- **Graceful Error Handling**: 404 handler for unknown routes, structured `{ success: false, message, errors }` responses.

---

## 9. Submission Package Checklist (Google Drive)

As specified by IPAGE Group, prepare the Google Drive folder named `FullStack_Chatbot_Task_Mohd_Abdullah`:

```text
FullStack_Chatbot_Task_Mohd_Abdullah/
├── 01_Source_Code          # Complete root repository (client, server, configs)
├── 02_Screenshots           # High-resolution screenshots of Home, Services, Courses, Contact, Chat, Login, Admin Dashboard
├── 03_API_Documentation     # Exported API specs / Postman collection / Markdown guide
├── 04_Database              # MongoDB schema documentation & seed script
├── 05_Video_Walkthrough     # 5–10 minute demonstration video covering architecture and live features
├── 06_GitHub                # Link to public GitHub repository
└── 07_Resume                # Updated Resume PDF
```

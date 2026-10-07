# DroneTV AI Support & Lead Assistant

> **Full-Stack Web Application for IPAGE Group Technical Assessment**  
> **Candidate**: Mohd Abdullah (`FullStack_Chatbot_Task_Mohd_Abdullah`)  
> **GitHub Repository**: [https://github.com/MoAb786/FullStack_Chatbot_Task_Mohd_Abdullah](https://github.com/MoAb786/FullStack_Chatbot_Task_Mohd_Abdullah)

---

## 🌐 Live Demo Links

| Layer | Platform | Live URL |
| :--- | :--- | :--- |
| **Frontend Application** | **Cloudflare Workers** | [**https://dronetv-assistant.moab.workers.dev**](https://dronetv-assistant.moab.workers.dev) |
| **Backend REST API** | **Render (Web Service)** | [**https://fullstack-chatbot-task-mohd-abdullah.onrender.com**](https://fullstack-chatbot-task-mohd-abdullah.onrender.com) |
| **API Health Check** | **Render Endpoint** | [**https://fullstack-chatbot-task-mohd-abdullah.onrender.com/api/health**](https://fullstack-chatbot-task-mohd-abdullah.onrender.com/api/health) |
| **Database** | **MongoDB Atlas** | `cluster0.vu0um84.mongodb.net/dronetv` |

### 🔑 Demo Admin Credentials
- **Admin Portal URL**: [https://dronetv-assistant.moab.workers.dev/admin/login](https://dronetv-assistant.moab.workers.dev/admin/login)
- **Email**: `admin@dronetv.in`
- **Password**: `Admin@DroneTV2026`
- *(Or use the 1-click **"Fill"** button on the login screen)*

---

## 📖 Project Description

**DroneTV AI Support & Lead Assistant** is a responsive full-stack platform built for an enterprise drone aviation and DGCA pilot academy organization. It combines:
1. An aerospace-grade landing portal showcasing commercial UAV services, flight academy curriculums, and an interactive 60fps 3D Vector Avionics HUD canvas.
2. A deterministic rule-based AI support assistant with categorized quick prompts, conversation history persistence, and pre-filled lead intake CTAs.
3. A robust lead capture and validation pipeline storing customer and student mission requests.
4. A protected, multi-tab Admin Operations Dashboard providing complete CRUD management, full-text search, multi-criteria filtering, and CSV data export.

---

## ✨ Key Features

- **Interactive 3D Vector Avionics HUD**: Hardware-accelerated 60fps canvas engine with responsive cursor parallax, pitch/roll degree markings, UAV drone wireframe, radar sweeps, and telemetry gauges.
- **Dark Mode by Default**: Tailored dark theme with smooth anti-FOUC initialization and theme toggle.
- **Rule-Based AI Copilot**: 100% deterministic, zero-hallucination assistant handling pilot certification, course fees, eligibility requirements, payloads, and commercial services.
- **Full-Screen & Widget Chat Modes**: Available both as a persistent floating widget and a dedicated full-screen console at `/chat` with categorized question filters.
- **Lead Intake & Validation**: Real-time form validation powered by React Hook Form and Zod schemas on both client and server.
- **Multi-Tab Admin Operations Portal**:
  - **Flight Enquiries Pipeline**: Search, filter by status and user type, inline status updating, detailed inspection modal, delete confirmation, and CSV export.
  - **Fleet Operations**: Real-time telemetry monitoring for 6 UAV units with transponder ping diagnostics.
  - **Training Academies**: Cohort enrollment management and batch certificate generation.
  - **AI Copilot Inspector**: Live rule engine tester to evaluate queries with sub-15ms response latency.
  - **Telemetry & Health**: Live API endpoint audit table and node health checks.

---

## 🛠️ Technologies Used

### Frontend
- **React 19** — Component architecture with modern hooks
- **TypeScript** — Strict type safety across components and API models
- **Tailwind CSS v4** — Modern utility styling with dynamic theme variables
- **Vite 8** — Optimized development and ESM production build tool
- **React Router 7** — Client-side SPA routing with scroll restoration
- **React Hook Form & Zod** — Bidirectional client-side schema validation
- **Cloudflare Workers** — Global Edge CDN deployment with Static Assets

### Backend
- **Node.js & Express 5** — High-performance RESTful API framework
- **TypeScript** — Complete compile-time type safety
- **MongoDB & Mongoose 9** — Persistent document database with schema validation
- **JSON Web Token (JWT)** — Stateless HMAC-SHA256 bearer authentication
- **Helmet & CORS** — HTTP security headers and cross-origin protection
- **Render** — Cloud production container hosting

---

## 📁 Project Structure

```text
FullStack_Chatbot_Task_Mohd_Abdullah/
├── .env.example                               # Environment configuration template
├── .gitignore                                 # Git ignore rules
├── README.md                                  # Complete project documentation
│
├── client/                                    # Frontend (React 19 + TypeScript + Vite)
│   ├── index.html                             # Single page HTML entry point
│   ├── package.json                           # Frontend dependencies & scripts
│   ├── vite.config.ts                         # Vite & Tailwind v4 plugin setup
│   ├── tsconfig.json                          # TypeScript configuration
│   ├── wrangler.jsonc                         # Cloudflare Workers deployment configuration
│   ├── public/                                # Public assets & demo screenshots
│   │   ├── favicon.svg                        # Platform favicon
│   │   ├── icons.svg                          # Vector icons
│   │   └── img/                               # Application screenshots
│   └── src/
│       ├── main.tsx                           # React DOM mount point
│       ├── App.tsx                            # Root routing & theme providers
│       ├── index.css                          # Tailwind v4 theme & CSS custom properties
│       ├── types/                             # TypeScript interfaces & types
│       ├── context/                           # ThemeContext (Dark/Light mode)
│       ├── lib/                               # Typed REST API client & auth storage
│       ├── data/                              # Predefined domain knowledge & chat intents
│       ├── components/                        # UI Components (Navbar, Footer, HUD Canvas, Modals)
│       └── pages/                             # Pages (Home, Services, Courses, Contact, Chat, Admin)
│
└── server/                                    # Backend REST API (Node.js + Express 5 + Mongoose)
    ├── package.json                           # Backend dependencies & compilation scripts
    ├── tsconfig.json                          # Backend TypeScript configuration
    ├── .env.example                           # Server environment template
    └── src/
        ├── app.ts                             # Express app setup, CORS, Helmet, and routes
        ├── server.ts                          # Server listener and database bootloader
        ├── config/                            # Database connection setup
        ├── types/                             # Backend interfaces & payloads
        ├── models/                            # Mongoose schemas (Enquiry model)
        ├── schemas/                           # Zod validation schemas
        ├── middleware/                        # Auth, Zod validation, 404, and error middlewares
        ├── controllers/                       # Auth & Enquiry request controllers
        ├── routes/                            # Express REST API routes
        └── scripts/                           # Database seed script
```

---

## ⚙️ Environment Variables

### Backend Configuration (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/dronetv?appName=Cluster0
CLIENT_URL=http://localhost:5173
JWT_SECRET=supersecretjwtkey_dronetv_intern_2026_change_in_production
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=admin@dronetv.in
ADMIN_PASSWORD=Admin@DroneTV2026
```

### Frontend Configuration (`client/.env.production`)
```env
VITE_API_BASE_URL=https://fullstack-chatbot-task-mohd-abdullah.onrender.com/api
```

---

## 🗄️ Database Setup

The database is built on **MongoDB** with **Mongoose 9**:
- **Collection**: `enquiries`
- **Fields**: `name`, `email` (regex validated), `phone`, `userType` (`Student` | `Customer` | `Other`), `interest`, `message`, `status` (`New` | `Contacted` | `In Progress` | `Closed`), and timestamps (`createdAt`, `updatedAt`).

### Seed Sample Data
Populate the database with sample leads anytime:
```bash
cd server
npm run seed
```

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB instance (local or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/MoAb786/FullStack_Chatbot_Task_Mohd_Abdullah.git
cd FullStack_Chatbot_Task_Mohd_Abdullah
```

### 2. Backend Setup & Run
```bash
cd server
npm install
cp .env.example .env
# Configure your MONGODB_URI in server/.env
npm run seed     # Populate sample test leads
npm run dev      # Runs Express 5 API on http://localhost:5000
```

### 3. Frontend Setup & Run
```bash
cd ../client
npm install
npm run dev      # Runs Vite Frontend on http://localhost:5173
```

### 4. Build & Production Deployment
```bash
# Build & Deploy Frontend to Cloudflare
cd client
npm run deploy

# Build Backend for Production
cd ../server
npm run build
npm start
```

---

## 📡 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health and uptime check |
| `POST` | `/api/enquiries` | Submit a new lead / course inquiry |
| `POST` | `/api/auth/login` | Authenticate admin credentials and receive JWT |

### Protected Admin Endpoints (Require `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/auth/me` | Fetch authenticated admin profile |
| `GET` | `/api/enquiries` | List all enquiries (supports `search`, `userType`, `status`, `page`, `limit`) |
| `GET` | `/api/enquiries/stats` | Aggregate pipeline statistics (`total`, `new`, `contacted`, `inProgress`, `closed`) |
| `GET` | `/api/enquiries/:id` | Get single enquiry details by ID |
| `PATCH` | `/api/enquiries/:id` | Update enquiry status |
| `DELETE` | `/api/enquiries/:id` | Delete enquiry record |

---

## 📸 Screenshots

| **1. Landing Page & 3D Avionics HUD** | **2. Services Catalog & Specs Modal** |
| :---: | :---: |
| <img src="client/public/img/Landing%20Page%20%26%203D%20HUD.png" width="440" alt="Landing Page & 3D Avionics HUD" /> | <img src="client/public/img/Services%20Catalog.png" width="440" alt="Services Catalog & Specifications Modal" /> |
| *Hero section with 60fps 3D HUD radar canvas in Dark Mode* | *Enterprise UAV services with technical hardware specs modal* |

| **3. Pilot Training Academy & DGCA Tracks** | **4. Lead & Flight Mission Intake Desk** |
| :---: | :---: |
| <img src="client/public/img/Pilot%20Training%20Academy.png" width="440" alt="Pilot Training Academy Tracks" /> | <img src="client/public/img/Lead%20%26%20Contact%20Intake.png" width="440" alt="Lead & Flight Mission Intake Desk" /> |
| *DGCA certified pilot tracks with syllabus breakdowns* | *Real-time Zod-validated contact intake with airspace map* |

| **5. Interactive AI Support Assistant** | **6. Admin Operations Management Portal** |
| :---: | :---: |
| <img src="client/public/img/AI%20Support%20Assistant.png" width="440" alt="Interactive AI Support Assistant" /> | <img src="client/public/img/Admin%20Operations%20Portal.png" width="440" alt="Admin Operations Management Portal" /> |
| *Deterministic copilot with categorized prompt filters & CTAs* | *Multi-tab operations portal with MongoDB enquiry CRUD & CSV export* |

---

*Authored by Mohd Abdullah for the IPAGE Group Full Stack Developer Internship Technical Assessment.*


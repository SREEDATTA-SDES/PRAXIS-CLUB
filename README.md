# PRAXIS — SDES CSE-Allied Club Ecosystem

> **Official Student Club Platform of the Department of Computer Science & Engineering (Allied Branches)**  
> **SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE (SDES)**  
> *"A platform for creativity, technology, community and innovation."*

---

## 🌟 Overview

**PRAXIS** is a production-grade, cinematic digital ecosystem designed for students, faculty, club leads, and administrators at **Sree Dattha Institute of Engineering & Science**. It brings together technical and non-technical student bodies to collaborate, compete, publish announcements, archive moments, and register for campus hackathons and symposiums.

---

## 🏛️ Official Brand Assets & Master Clubs

All official master logos are hosted and referenced from official ImageKit assets without recoloring or distortion.

### Master Identities
- **College Name:** SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE
- **College Website:** [https://www.sreedattha.ac.in/sdes/](https://www.sreedattha.ac.in/sdes/)
- **College Official Logo:** `https://ik.imagekit.io/SDES/LOGOS/CLG%20LOGO.png`
- **PRAXIS Platform Logo:** `https://ik.imagekit.io/SDES/LOGOS/PRAXIS%20Logo.png`

### 1. Technical Clubs
1. **Genesis** (`/clubs/genesis`)  
   *Software, Algorithms, AI, and Competitive Programming*  
   Accent: Purple / Cyan (`#8B5CF6` / `#06B6D4`)

2. **Innovex** (`/clubs/innovex`)  
   *Embedded Hardware, Internet of Things (IoT) & Robotics*  
   Accent: Red / Crimson (`#EF4444` / `#F87171`)

3. **AI Club** (`/clubs/ai-club`)  
   *Artificial Intelligence, Machine Learning & Data Science*  
   Accent: Emerald / Teal (`#10B981` / `#34D399`)

4. **Visual Vibes** (`/clubs/visual-vibes`)  
   *Cinematography, Digital Media, Video Editing & Tech Event Storytelling*  
   Accent: Purple / Sky (`#A855F7` / `#22D3EE`)

### 2. Non-Technical Clubs
5. **D-Talks** (`/clubs/d-talks`)  
   *Parliamentary Debating, Oratory, MUNs & Public Speaking*  
   Accent: Cyan / Magenta (`#EC4899` / `#06B6D4`)

6. **Lakshya** (`/clubs/lakshya`)  
   *Civic Responsibility, Social Outreach & Campus Vitality*  
   Accent: Blue / Gold (`#3B82F6` / `#F59E0B`)

7. **Creative Art** (`/clubs/creative-art`)  
   *Fine Arts, Canvas Painting, Sketching & Creative Crafts*  
   Accent: Rose / Orange (`#F43F5E` / `#FB923C`)

8. **Swara** (`/clubs/swara`)  
   *Classical & Western Dance, Vocal Melodies, Rhythm Jams & Cultural Performing Arts*  
   Accent: Amber / Crimson (`#F59E0B` / `#EF4444`)

---

## 🎨 Visual Design System & Cinematics

Built following the provided dark cinematic UI reference:
- **Base Palette:** Deep navy/black background (`#07090D`, `#0B1422`, `#101A2A`), Card surface (`#141D2B`), Elevated surface (`#1B2635`), Borders (`#263447`).
- **Glow Accents:** Soft blue rim luminescence (`#2876B8`), PRAXIS Amber (`#FF9D24`), Electric Cyan (`#20D9FF`).
- **Typography:** Display Title (`Bebas Neue` / `Syne`), Body (`Plus Jakarta Sans` / `Inter`). High editorial contrast with letter-spaced tracking.
- **Cinematic Opening Sequence:** 3–5 second branded reveal featuring the SDES institutional emblem, transitioning into the PRAXIS coin-flip emblem (skippable and persisted in session).
- **Subtle Film Grain & Canvas Particles:** GPU-friendly ambient particle field with reduced-motion support.

---

## 🚀 Full-Stack Architecture

### Frontend (`frontend/`)
- **React + Vite** with Tailwind CSS
- **React Router v7** for deep SPA routing
- **Lucide Icons** & custom SVG Social Icons (Instagram, Facebook, WhatsApp)
- **Centralized Data & Auth Contexts** with local fallback for offline resilience
- **Google Forms Integration** for seamless event registrations
- **Schedule PDF Viewer / Download** links
- **Interactive Global Search** (Ctrl/Cmd + K) across clubs, events, gallery, and circulars
- **High-Resolution Lightbox Modal** for photo gallery inspection

### Backend (`backend/`)
- **Node.js + Express** (ES Modules)
- **MongoDB Atlas** with Mongoose models
- **Resilient Fallback Mode:** Automatically runs in memory if `MONGODB_URI` is not provided, allowing zero-friction evaluation
- **Role-Based Access Control (RBAC):**
  - `SUPER_ADMIN`: Complete access to all entities and admin user accounts
  - `FACULTY_ADMIN`: Manage clubs, events, gallery, leadership, and circulars
  - `CLUB_ADMIN`: Restricted strictly to their assigned club chapter
- **JWT Authentication** + **bcryptjs** password hashing
- **CORS** & Input sanitization

---

## 🔐 Administrative Console (`/admin`)

Access route: `/admin/login` *(Subtly accessible via the footer "Portal" link)*

### Default Seed Accounts:
| Role | Username | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin` | `admin@praxis.sdes.ac.in` | `password` | Complete platform control |
| **Faculty Admin** | `facultyadmin` | `faculty@praxis.sdes.ac.in` | `password` | All clubs, events & circulars |
| **Club Admin** | `genesisadmin` | `genesis@praxis.sdes.ac.in` | `password` | Genesis chapter only |

---

## 💻 Local Development Setup

Refer to [OPERATE.md](file:///d:/projects/PRAXIS-CLUD/OPERATE.md) for detailed commands.

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Start Backend Server
```bash
npm run dev:backend
# Server starts on http://localhost:5000
```

### 3. Start Frontend Client
```bash
npm run dev:frontend
# Client starts on http://localhost:5173
```

### 4. (Optional) Seed MongoDB Atlas
If using a live MongoDB cluster, create `backend/.env` with:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/praxis_db?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret
```
Then run:
```bash
npm run seed
```

---

## 🌐 Deployment Guide

### Frontend Deployment (Vercel)
1. Push this repository to GitHub: `https://github.com/SREEDATTA-SDES/PRAXIS-CLUB.git`.
2. Connect the repository on **Vercel**.
3. Set **Root Directory** to `frontend`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Environment Variables:
   - `VITE_API_URL`: Your deployed Render backend URL (e.g. `https://praxis-backend.onrender.com`).

### Backend Deployment (Render)
1. In **Render**, create a **New Web Service**.
2. Connect this GitHub repository.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`.
5. Start command: `npm start`.
6. Environment Variables:
   - `PORT`: `5000` (or leave default)
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random secret string.

---

## 📄 Documentation Files
- **[STRUCTURE.md](file:///d:/projects/PRAXIS-CLUD/STRUCTURE.md):** Complete project file and folder tree breakdown.
- **[OPERATE.md](file:///d:/projects/PRAXIS-CLUD/OPERATE.md):** Operations manual, run commands, ports, and GitHub PAT push guide.

---

## 📄 License
© SDES PRAXIS — Sree Dattha Institute of Engineering & Science. All rights reserved.

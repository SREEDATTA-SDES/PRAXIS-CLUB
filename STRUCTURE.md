# PRAXIS Project Architecture & File Structure

This document presents the complete directory and file tree of the **PRAXIS — SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE (SDES)** ecosystem.

```text
PRAXIS-CLUB/
├── .gitignore                      # Git exclusion rules for dependencies & builds
├── package.json                    # Root workspace orchestrator scripts
├── README.md                       # Comprehensive platform overview & specifications
├── STRUCTURE.md                    # Complete file tree & layout guide (this file)
├── OPERATE.md                      # Operational manual & command reference
│
├── backend/                        # Node.js + Express API & Database Services
│   ├── .env.example                # Template for MongoDB URI and JWT secrets
│   ├── package.json                # Backend dependencies & script definitions
│   └── src/
│       ├── server.js               # Express application entry, CORS, routing & port listener
│       │
│       ├── config/
│       │   └── db.js               # MongoDB connection manager with resilient fallback
│       │
│       ├── data/
│       │   └── defaultData.js      # Official seed dataset with master ImageKit logos
│       │
│       ├── middleware/
│       │   └── auth.js             # JWT verification, RBAC role guard & club scope checks
│       │
│       ├── models/                 # Mongoose Data Schemas
│       │   ├── Announcement.js     # Circulars & pinned notices schema
│       │   ├── Club.js             # 6 official chapters, visions, missions & palettes
│       │   ├── Event.js            # Hackathons, Google Form URLs & schedule PDFs
│       │   ├── Gallery.js          # Archived photo collections & albums
│       │   ├── Leader.js           # Faculty advisors, club leads & coordinators
│       │   ├── Setting.js          # Campus contact, address & social channels
│       │   └── User.js             # Staff & admin credentials with hashed passwords
│       │
│       ├── controllers/            # Request handlers & business logic
│       │   ├── adminController.js  # Dashboard stats & admin account management
│       │   ├── announcementController.js
│       │   ├── authController.js   # JWT login & session validation
│       │   ├── clubController.js   # Chapter metadata & associated listings
│       │   ├── eventController.js  # Events CRUD with club-level permissions
│       │   ├── galleryController.js# Media upload & deletion
│       │   ├── leadershipController.js
│       │   └── settingController.js# Institutional contact configuration
│       │
│       ├── routes/                 # Express API Endpoint Routers
│       │   ├── adminRoutes.js      # /api/admin/*
│       │   ├── announcementRoutes.js# /api/announcements/*
│       │   ├── authRoutes.js       # /api/auth/*
│       │   ├── clubRoutes.js       # /api/clubs/*
│       │   ├── eventRoutes.js      # /api/events/*
│       │   ├── galleryRoutes.js    # /api/gallery/*
│       │   ├── leadershipRoutes.js # /api/leadership/*
│       │   └── settingRoutes.js    # /api/settings/*
│       │
│       ├── scripts/
│       │   └── seed.js             # MongoDB Atlas seeder with master PRAXIS data
│       │
│       └── services/
│           └── dataService.js      # Unified persistence layer (MongoDB + In-Memory)
│
└── frontend/                       # React 19 + Vite 6 + Tailwind CSS Client
    ├── index.html                  # HTML5 entry with Google Fonts & SEO Open Graph
    ├── package.json                # Frontend package configuration
    ├── postcss.config.js           # PostCSS configuration for Tailwind
    ├── tailwind.config.js          # Custom cinematic theme, tokens & colors
    ├── vercel.json                 # Single-Page-App (SPA) rewrite rules for Vercel
    ├── vite.config.js              # Vite server & backend API proxy (/api -> :5000)
    │
    ├── public/
    │   └── favicon.svg             # Browser tab favicon
    │
    └── src/
        ├── main.jsx                # Application root with BrowserRouter & Providers
        ├── App.jsx                 # Master application shell, intro gating & routes
        ├── index.css               # Film grain shaders, glassmorphism & typography
        │
        ├── assets/                 # Local SVG & static assets
        │
        ├── context/                # React Context Providers
        │   ├── AuthContext.jsx     # User session, JWT tokens & role helpers
        │   └── DataContext.jsx     # Real-time data sync, state mutations & toasts
        │
        ├── data/
        │   └── initialData.js      # Master brand assets, colors & default items
        │
        ├── services/
        │   └── api.js              # Centralized fetch client with offline resilience
        │
        ├── components/             # Reusable UI & Layout Components
        │   ├── AnnouncementsSection.jsx # Bulletin ticker for circulars
        │   ├── AtmosphericBackground.jsx# Canvas particle field & glow shaders
        │   ├── ClubCard.jsx        # Chapter card with official logo & hover glow
        │   ├── EventCard.jsx       # Event card with Google Forms & schedule PDF
        │   ├── Footer.jsx          # Cinematic footer with college & social links
        │   ├── Hero.jsx            # Poster-inspired hero with 3D coin-flip logo
        │   ├── IntroSequence.jsx   # 3-5s cinematic institutional reveal
        │   ├── LeadershipSection.jsx# Faculty advisory & student coordinator grid
        │   ├── LightboxModal.jsx   # High-resolution image modal viewer
        │   ├── Navbar.jsx          # Minimal navbar with college branding & search
        │   ├── ScrollToTop.jsx     # Smooth window scroll on page transition
        │   ├── SearchModal.jsx     # Instant search modal (Cmd/Ctrl + K)
        │   └── SocialIcons.jsx     # High-fidelity SVG icons for Instagram/FB/WA
        │
        └── pages/                  # Page Views & Routes
            ├── AboutPage.jsx       # SDES history, CSE-Allied, manifesto & leadership
            ├── ClubDetailPage.jsx  # /clubs/:clubSlug with custom dynamic accents
            ├── ClubsPage.jsx       # /clubs directory with category tabs
            ├── ContactPage.jsx     # Campus location, Google Maps & message form
            ├── EventsPage.jsx      # /events with filter tabs & search
            ├── GalleryPage.jsx     # /gallery with club chips & albums
            ├── HomePage.jsx        # Main landing page adhering to 8-step structure
            │
            └── admin/              # Management Console (/admin)
                ├── AdminAnnouncements.jsx # Publish & pin official notices
                ├── AdminClubs.jsx         # Edit chapter visions, missions & info
                ├── AdminDashboard.jsx     # Metrics counters & recent activity
                ├── AdminEvents.jsx        # Manage hackathons, posters & forms
                ├── AdminGallery.jsx       # Manage albums & photo archives
                ├── AdminLayout.jsx        # RBAC sidebar navigation & auth guard
                ├── AdminLeadership.jsx    # Add & update coordinators
                ├── AdminLogin.jsx         # Secure login with one-click test roles
                ├── AdminSettings.jsx      # Campus contact & social channels
                └── AdminUsers.jsx         # Super Admin account management
```

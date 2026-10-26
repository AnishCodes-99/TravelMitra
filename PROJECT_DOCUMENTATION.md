# 🇮🇳 TravelMitra — Complete Project Architecture & Tech Stack Documentation

> **Comprehensive Technical Specification & Architecture Guide**  
> *Project Name:* **TravelMitra**  
> *Tagline:* India's Modern, Transparent & Reliable Travel Booking Ecosystem  
> *Live Deployments:*  
> - **Firebase Production:** [https://travelmitra-46cbd.web.app](https://travelmitra-46cbd.web.app)  
> - **GitHub Pages:** [https://anishcodes-99.github.io/TravelMitra](https://anishcodes-99.github.io/TravelMitra)  

---

## 📑 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Complete Technology Stack](#2-complete-technology-stack)
3. [End-to-End Directory Structure & File Paths](#3-end-to-end-directory-structure--file-paths)
4. [Frontend Architecture (`client/`)](#4-frontend-architecture-client)
5. [Backend & API Architecture (`server/`)](#5-backend--api-architecture-server)
6. [Database & Cloud Persistence (Firebase Firestore)](#6-database--cloud-persistence-firebase-firestore)
7. [Authentication & Persistent Session Lifecycle](#7-authentication--persistent-session-lifecycle)
8. [Core Modules & Business Logic](#8-core-modules--business-logic)
9. [Deployment & Multi-Platform Hosting Setup](#9-deployment--multi-platform-hosting-setup)
10. [Local Development & Build Instructions](#10-local-development--build-instructions)

---

## 1. Project Overview

**TravelMitra** is a full-stack, enterprise-grade Online Travel Agency (OTA) tailored specifically for Indian travelers. Inspired by industry standards like MakeMyTrip and EaseMyTrip, it eliminates hidden convenience fees, provides real-time pricing across cabin classes, features transparent airline and hotel filters, and connects directly to cloud database storage for bookings and user profiles.

### Core Highlights:
- **Zero Hidden Costs:** All fares calculated dynamically in Indian Rupees (INR ₹) inclusive of GST.
- **Dynamic Cabin Classes:** Real-time fare multipliers for Economy (1.0x), Premium Economy (1.6x), Business (2.8x), and First Class (4.5x).
- **Persistent User Experience:** Zero-latency login state hydration; users stay logged in across browser closes, tab re-opens, and refreshes until an explicit sign-out is triggered.
- **Brand-New User Isolation:** Brand-new accounts start with clean, authentic zero (0) bookings, 0 wishlists, and 0 coins.
- **Direct Support Routing:** Help and inquiry tickets sent directly to `wanianish75@gmail.com`.
- **Aesthetic Visual Design:** Warm Indian saffron/orange brand identity, crisp Inter typography, and subtle luxury resort backdrop opacity (`opacity-[0.05]`) preserving readability.

---

## 2. Complete Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** + **TypeScript** | `^18.3.1` | Type-safe declarative UI components & state trees |
| **Build Tool & Bundler** | **Vite** | `^6.0.7` | Blazing fast HMR, Rollup production bundling |
| **Routing** | **React Router DOM** | `^7.1.1` | HashRouter for GitHub Pages & BrowserRouter for Firebase |
| **State & Data Fetching** | **TanStack React Query** | `^5.62.15` | Async query cache, optimistic updates, and background refetches |
| **Styling & CSS** | **Tailwind CSS** + PostCSS | `^3.4.17` | Utility-first design system with customized brand palettes |
| **Form Management** | **React Hook Form** + **Zod** | `^7.54.2` / `^3.24.1` | Schema-based validation for login, registration & contact forms |
| **Icons & Micro-UI** | **Lucide React** | `^0.468.0` | Crisp modern vector iconography |
| **Backend Runtime** | **Node.js** + **Express.js** | `^4.21.2` | RESTful API server for flights, hotels, and bookings |
| **Cloud Database** | **Firebase Firestore** | `^11.1.0` | Cloud NoSQL DB for users, user preferences, and bookings |
| **Cloud Authentication** | **Firebase Auth** | `^11.1.0` | Secure email/password & Google OAuth sign-in |
| **Local Storage Cache** | **Browser LocalStorage API** | Web API | Zero-millisecond synchronous session hydration |
| **Helpdesk Relay** | **FormSubmit.co API** | REST API | Headless secure form email delivery to `wanianish75@gmail.com` |
| **Production Hosting 1** | **Firebase Hosting** | Global CDN | Fast SSL hosting with rewrite rules to `index.html` |
| **Production Hosting 2** | **GitHub Pages** | Static CDN | Static bundle hosting with SPA 404 fallback routing |

---

## 3. End-to-End Directory Structure & File Paths

```
TravelMitra/
├── .env                              # Root environment variables
├── firebase.json                     # Firebase Hosting & Firestore rules configuration
├── firestore.rules                   # Security rules for Cloud Firestore collections
├── package.json                      # Workspace root configuration (monorepo scripts)
├── PROJECT_DOCUMENTATION.md          # Technical documentation (this file)
│
├── client/                           # ── FRONTEND APPLICATION ──
│   ├── .env                          # Firebase API Keys & Client Environment Config
│   ├── index.html                    # Root HTML template
│   ├── package.json                  # Client dependencies (React, Vite, Tailwind, etc.)
│   ├── postcss.config.js             # PostCSS processing config
│   ├── tailwind.config.js            # Tailwind custom colors (brand oranges, emeralds, slate)
│   ├── tsconfig.json                 # TypeScript compiler configuration
│   ├── vite.config.ts                # Vite build and server configuration
│   │
│   ├── src/
│   │   ├── App.tsx                   # Main router hierarchy & QueryClientProvider
│   │   ├── main.tsx                  # React DOM mount point
│   │   ├── index.css                 # Global CSS rules & Tailwind directives
│   │   ├── vite-env.d.ts             # Global TypeScript ambient declarations
│   │   │
│   │   ├── components/               # Reusable UI & Layout Components
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx        # Top micro-bar, responsive navbar & user profile dropdown
│   │   │   │   ├── Footer.tsx        # Indian travel footer, certifications & support info
│   │   │   │   └── Layout.tsx        # Shell layout with background image styling
│   │   │   └── ui/                   # Atomic UI components
│   │   │       ├── Alert.tsx         # Notification and alert cards
│   │   │       ├── Badge.tsx         # Status chips & indicators
│   │   │       ├── Button.tsx        # Reusable button with variants & loading states
│   │   │       ├── Card.tsx          # Card container with hover and shadow styling
│   │   │       └── Input.tsx         # Form input with icons and validation errors
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx       # Auth provider, persistent session hydration & user state
│   │   │
│   │   ├── features/                 # Modular domain features
│   │   │   └── search/
│   │   │       └── SearchHero.tsx    # Flight / Hotel tabbed booking search widget
│   │   │
│   │   ├── lib/
│   │   │   ├── firebase.ts           # Firebase SDK initialization (Auth & Firestore)
│   │   │   └── utils.ts              # INR Currency formatter (`formatINR`), date utils, classNames
│   │   │
│   │   ├── pages/                    # Route Page Components
│   │   │   ├── Home.tsx              # Landing page with offers, trending sectors & reviews
│   │   │   ├── Flights.tsx           # Flight listings, dynamic cabin class fares & filters
│   │   │   ├── Hotels.tsx            # Hotel search, Indian landmark addresses, ratings & rooms
│   │   │   ├── Packages.tsx          # Curated Indian holiday packages (Goa, Kashmir, Kerala)
│   │   │   ├── Destinations.tsx      # Top Indian travel destination cards
│   │   │   ├── Dashboard.tsx         # User portal: live bookings, loyalty coins & profile stats
│   │   │   ├── Profile.tsx           # Traveler profile, phone & flight dining/seat preferences
│   │   │   ├── MyTrips.tsx           # Confirmed bookings, live PNR status & luxury E-Ticket modal
│   │   │   ├── Bookings.tsx          # Booking confirmation flow
│   │   │   ├── Saved.tsx             # Saved wishlists & bookmark manager
│   │   │   ├── Contact.tsx           # 24/7 Helpdesk form connected to wanianish75@gmail.com
│   │   │   ├── About.tsx             # Company mission & DGCA/IATA compliance notes
│   │   │   ├── Faq.tsx               # Frequently asked questions
│   │   │   ├── Login.tsx             # Email & Google OAuth login portal
│   │   │   ├── Register.tsx          # New account registration
│   │   │   ├── ForgotPassword.tsx    # Password reset email trigger
│   │   │   └── NotFound.tsx          # 404 Error page
│   │   │
│   │   ├── services/                 # External and Internal API Services
│   │   │   ├── api.ts                # Flight and Hotel catalog data providers
│   │   │   ├── authService.ts        # Firebase Auth wrapper (Email/Pass, Google, Profile)
│   │   │   └── firestoreService.ts   # Firestore read/write operations (Users & Bookings)
│   │   │
│   │   └── types/
│   │       └── index.ts              # TypeScript interfaces (FlightItem, HotelItem, User, etc.)
│   │
│   └── dist/                         # Compiled production bundle for Firebase Hosting
│
├── server/                           # ── BACKEND APPLICATION ──
│   ├── package.json                  # Express backend dependencies
│   ├── tsconfig.json                 # TypeScript config for Node.js
│   └── src/
│       ├── index.ts                  # Express server entry point & middleware
│       ├── config/                   # Server configuration & environment
│       ├── controllers/              # Request handlers (Flights, Hotels, Bookings)
│       ├── routes/                   # REST API routes (`/api/v1/...`)
│       └── models/                   # Data schemas
│
└── docs/                             # ── GITHUB PAGES DEPLOYMENT ──
    ├── index.html                    # Production build HTML for GitHub Pages
    ├── 404.html                      # Single Page App redirect for deep links on GitHub Pages
    ├── logo.png                      # Favicon & brand asset
    └── assets/                       # Minified CSS & JS production bundles
```

---

## 4. Frontend Architecture (`client/`)

### 4.1 Routing & Multi-Environment Navigation
Defined in [`client/src/App.tsx`](file:///e:/Desktop/TravelMitra/client/src/App.tsx):
- Detects whether running on **GitHub Pages** (`location.hostname.includes('github.io')`) or **Firebase Hosting**.
- Uses `HashRouter` for GitHub Pages to completely eliminate `404 Not Found` on page reload or direct URL pasting.
- Uses standard HTML5 `BrowserRouter` for Firebase Hosting, backed by `firebase.json` wildcard rewrites.

### 4.2 State Management & Network Fetching
- Managed using `@tanstack/react-query` for automatic caching, zero duplicate network requests, and instant back/forward navigation.
- Native `AuthContext` provides global synchronous state for user identity, authentication status, and profile mutations.

---

## 5. Backend & API Architecture (`server/`)

### 5.1 Endpoints Overview
- `GET /api/v1/flights` — Searches available flights by origin, destination, date, and passenger count.
- `GET /api/v1/hotels` — Queries hotel inventory filtered by city, price tier, and star rating.
- `POST /api/v1/bookings` — Records new reservations and initiates mock or live Razorpay transaction flow.
- `GET /api/v1/bookings/:userId` — Retrieves reservation records for a specific traveler.

---

## 6. Database & Cloud Persistence (Firebase Firestore)

Cloud Firestore is configured in [`client/src/lib/firebase.ts`](file:///e:/Desktop/TravelMitra/client/src/lib/firebase.ts) and orchestrated by [`client/src/services/firestoreService.ts`](file:///e:/Desktop/TravelMitra/client/src/services/firestoreService.ts).

### Collection: `users`
Each document is keyed by `user.uid`:
```typescript
interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  lastLoginAt: string;        // ISO 8601 Timestamp
  createdAt: string;          // ISO 8601 Timestamp
  role: 'traveler' | 'admin';
}
```

### Collection: `bookings`
Each document is keyed by unique booking ID (e.g., `TM-2026-XXXX`):
```typescript
interface BookingRecord {
  id: string;                 // Primary Key
  pnr: string;                // Flight/Hotel PNR (e.g., 6E-IND78X)
  userId?: string;            // Authenticated user UID
  userEmail?: string;         // Authenticated user Email
  title: string;              // e.g. "Delhi to Goa Beach Flight"
  type: 'Flight' | 'Hotel' | 'Holiday Package';
  dates: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  airline?: string;
  hotel?: string;
  totalCost: number;          // Total fare in INR
  currency: 'INR';
  passenger: string;          // Full traveler name
  paymentId: string;          // Verified Payment ID
  bookedAt: string;
  createdAt: string;
}
```

---

## 7. Authentication & Persistent Session Lifecycle

### 7.1 How Persistent Login Works
1. **Instant Hydration:** Upon mounting, [`AuthContext.tsx`](file:///e:/Desktop/TravelMitra/client/src/context/AuthContext.tsx) executes a synchronous initializer that checks `localStorage.getItem('travelmitra_persistent_user')`.
2. **Explicit Logout Flag:** An explicit logout flag (`travelmitra_explicit_logout`) tracks whether the user intentionally logged out.
3. **No Accidental Logouts:** When the user closes the tab, shuts down the computer, or returns weeks later, **they are never logged out**.
4. **Isolated New User Accounts:**
   - When a new traveler signs up, their booking count is strictly initialized to `0`.
   - Their Dashboard reflects `0 Booked Trips`, `0 Wishlists`, and `0 Loyalty Coins`.
   - The empty state guides them cleanly to start searching flights and hotels.

---

## 8. Core Modules & Business Logic

### 8.1 Flight Cabin Class Pricing Multipliers
In [`client/src/pages/Flights.tsx`](file:///e:/Desktop/TravelMitra/client/src/pages/Flights.tsx):
- **Economy:** Baseline fare ($1.0\times$)
- **Premium Economy:** $1.6\times$
- **Business Class:** $2.8\times$
- **First Class:** $4.5\times$
- Selecting any class updates every flight card instantly, recalculates lowest fare badges on stops and airline filters, and scales the price slider ceiling to ensure high-tier cabins are never cut off.

### 8.2 Real Indian Landmark Hotels
In [`client/src/pages/Hotels.tsx`](file:///e:/Desktop/TravelMitra/client/src/pages/Hotels.tsx) and [`client/src/services/api.ts`](file:///e:/Desktop/TravelMitra/client/src/services/api.ts):
- Every hotel is paired with real Indian landmark addresses (e.g., *Connaught Place, Central New Delhi*, *Calangute Beach Road, North Goa*).
- Displays certified traveler ratings (e.g., `★ 4.8 Exceptional (480 reviews)`), room categories (Deluxe City View / Luxury Sea View Villa), and Free Cancellation policies.

### 8.3 Helpdesk Email Relay
In [`client/src/pages/Contact.tsx`](file:///e:/Desktop/TravelMitra/client/src/pages/Contact.tsx):
- All contact inquiries submit via POST to `https://formsubmit.co/ajax/wanianish75@gmail.com`.
- Includes automated subject tagging `[TravelMitra Support Request]`, traveler details, and a secondary direct `mailto:` fallback.

---

## 9. Deployment & Multi-Platform Hosting Setup

### 9.1 Firebase Hosting (Production Target 1)
- **Project:** `travelmitra-46cbd`
- **Live URL:** [https://travelmitra-46cbd.web.app](https://travelmitra-46cbd.web.app)
- **Deployment Command:** `firebase deploy --only hosting`
- Serves directly from `client/dist/`.

### 9.2 GitHub Pages (Production Target 2)
- **Repository:** `AnishCodes-99/TravelMitra`
- **Live URL:** [https://anishcodes-99.github.io/TravelMitra](https://anishcodes-99.github.io/TravelMitra)
- **Deployment Folder:** `docs/`
- Includes `docs/404.html` containing an SPA redirect script to preserve direct routing without 404 errors.

---

## 10. Local Development & Build Instructions

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Installation
```bash
# Clone the repository
git clone https://github.com/AnishCodes-99/TravelMitra.git
cd TravelMitra

# Install dependencies across all workspaces
npm install
```

### Running Locally
```bash
# Start Client Dev Server (Vite)
npm run dev --workspace=client
# App opens at http://localhost:5173

# Start Backend Server (Express)
npm run dev --workspace=server
# API runs at http://localhost:5000
```

### Building for Production
```bash
# Typecheck & Build Client
npm run build --workspace=client

# Sync to GitHub Pages directory
Copy-Item -Path "client\dist\*" -Destination "docs\" -Recurse -Force
```

### Deploying to Firebase
```bash
firebase deploy --only hosting
```

---

*Authored for TravelMitra Development Team — 2026*

# TravelMitra (ट्रैवलमित्र) — Modern Indian Travel Booking Platform

> **"Your Trusted Journey Companion"**  
> A full-stack travel booking application inspired by the functionality of MakeMyTrip, engineered with an original identity, transparent Indian Rupee (₹) pricing, zero hidden convenience fees, and 24/7 Mitra customer care.

---

## 1. Project Overview

**TravelMitra** is designed specifically for Indian travellers seeking an honest, high-performance, and dependable portal to search and book domestic flights, curated heritage stays, and all-inclusive holiday packages.

- **Primary Audience:** Indian domestic and international travellers.
- **Default Currency:** INR (₹).
- **Default Timezone:** Asia/Kolkata (IST).
- **Design Philosophy:** Minimalist white aesthetic with warm Indian orange accents, high-contrast typography, clear visual feedback, and comprehensive client-side form validation.

---

## 2. Technology Stack

### Frontend (`client/`)
- **Core:** React 18, Vite 6, TypeScript 5 (Strict Mode)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS 3.4 with custom TravelMitra design tokens & shadcn/ui-compatible component system
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form + Zod
- **Data Fetching:** TanStack Query (React Query)
- **Testing:** Vitest, React Testing Library, JSDOM

### Backend (`server/`)
- **Runtime & Framework:** Node.js, Express.js, TypeScript 5
- **Execution & Hot Reloading:** TSX
- **Security:** Helmet (secure HTTP headers), CORS with explicit frontend whitelisting, request size limits (1MB), credential sanitization in logs
- **Database ORM:** Mongoose 8 (MongoDB Atlas)
- **Validation:** Zod
- **Testing:** Vitest, Supertest

### Development Workflow & Monorepo
- **Workspace Architecture:** npm workspaces (`client`, `server`)
- **Orchestration:** Concurrently
- **Code Quality:** ESLint 9 (Flat Config), Prettier
- **Continuous Integration:** GitHub Actions (`.github/workflows/ci.yml`)

---

## 3. System Architecture & Directory Structure

```
travelmitra/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/            # Header, Footer, Layout shell
│   │   │   └── ui/                # Button, Input, Card, Badge, Alert, Tabs
│   │   ├── context/               # AuthContext (Firebase integration)
│   │   ├── features/
│   │   │   └── search/            # FlightSearchForm, HotelSearchForm, PackageSearchForm, SearchHero
│   │   ├── lib/                   # firebase.ts, utils.ts
│   │   ├── pages/                 # Home, Flights, Hotels, Packages, Destinations,
│   │   │                          # Login, Register, ForgotPassword, MyTrips, Dashboard,
│   │   │                          # Profile, Bookings, Saved, About, Contact, Faq, NotFound
│   │   ├── services/              # api.ts (backend client), authService.ts
│   │   ├── test/                  # Vitest component & form validation tests
│   │   ├── types/                 # TypeScript domain and API interfaces
│   │   ├── App.tsx                # Main router with QueryClientProvider & AuthProvider
│   │   ├── index.css              # Tailwind CSS directives & base design tokens
│   │   └── main.tsx               # DOM mount entry point
│   ├── .env.example               # Frontend environment template
│   ├── index.html                 # Document metadata & Google Fonts
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vitest.config.ts
├── server/
│   ├── src/
│   │   ├── config/                # env.ts (Zod validation), db.ts (Mongoose)
│   │   ├── controllers/           # healthController, flightController, hotelController, packageController
│   │   ├── middleware/            # errorHandler, notFound, requestLogger, auth (Firebase token scaffold)
│   │   ├── models/                # UserProfile, SavedDestination, Trip, Booking (Mongoose)
│   │   ├── providers/             # Provider-adapter architecture (Amadeus, Hotel, Razorpay)
│   │   ├── routes/                # healthRoutes, flightRoutes, hotelRoutes, packageRoutes, authRoutes
│   │   ├── utils/                 # logger.ts (sanitizes secrets and authorization tokens)
│   │   ├── app.ts                 # Express configuration, Helmet, CORS, routes
│   │   └── index.ts               # Server startup & graceful shutdown
│   ├── tests/                     # Supertest API health & 404 handler tests
│   ├── .env.example               # Backend environment template
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions lint, test, typecheck, build
├── .editorconfig
├── .gitignore
├── .prettierrc.json
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 4. Prerequisites

- **Node.js:** v20.x, v22.x or v24.x
- **npm:** v10.x or v11.x
- **Git:** Installed and initialized

---

## 5. Installation & Setup

1. **Clone or Open the Repository:**
   ```bash
   cd e:/Desktop/TravelMitra
   ```

2. **Install all workspace dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy client template:
     ```bash
     cp client/.env.example client/.env
     ```
   - Copy server template:
     ```bash
     cp server/.env.example server/.env
     ```

---

## 6. Development Scripts

Run scripts from the repository root:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts **both** Vite frontend (`:5173`) and Express backend (`:5000`) simultaneously |
| `npm run dev:client` | Starts Vite frontend dev server at `http://localhost:5173` |
| `npm run dev:server` | Starts Express backend server with TSX hot reload at `http://localhost:5000` |
| `npm run build` | Compiles client for production (`client/dist`) and compiles server TypeScript (`server/dist`) |
| `npm run typecheck` | Runs strict TypeScript checks across client and server workspaces |
| `npm run lint` | Runs ESLint validation across client and server |
| `npm test` | Executes client Vitest DOM tests and server Supertest API tests |

---

## 7. Configuration Guides

### A. Firebase Authentication (Phase 1 & Phase 2)
TravelMitra uses **Firebase Authentication** for Google Sign-In, Email/Password authentication, and password reset.

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project named `TravelMitra`.
2. Enable **Authentication** -> **Sign-in method** -> Activate **Google** and **Email/Password**.
3. Register a Web App under Project Settings and copy the configuration keys into `client/.env`:
   ```ini
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=travelmitra.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=travelmitra
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```
4. *Graceful Development Fallback:* If Firebase keys are not provided, the frontend runs in development preview mode with clear notices and guidance, rather than crashing or simulating fake logins.
5. In Phase 2, download a Service Account private key JSON from Firebase Console -> Service accounts and configure `server/.env` (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) to verify ID tokens on protected routes.

### B. MongoDB Atlas Database
TravelMitra models are defined with Mongoose:
- `UserProfile`: User metadata, phone, flight seat/meal preferences, currency.
- `SavedDestination`: User wishlist items with compound unique indexes.
- `Trip`: Custom itineraries with day-wise schedules and passenger numbers.
- `Booking`: Comprehensive reservation records, Razorpay order IDs, payment status.

To connect MongoDB Atlas:
1. Create a free M0 cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database user and allow your IP in Network Access.
3. Paste the connection string into `server/.env`:
   ```ini
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/travelmitra?retryWrites=true&w=majority
   ```
4. *Local Dev Mode:* If `MONGODB_URI` is blank, the server logs a warning and runs in documented local mode; the `/api/v1/health` endpoint reports `database: "not-configured"`.

### C. Amadeus Flight & Travel API (Future Integration)
The flight provider adapter in `server/src/providers/flights/amadeusProvider.ts` is configured with:
```ini
AMADEUS_CLIENT_ID=your_client_id
AMADEUS_CLIENT_SECRET=your_client_secret
AMADEUS_BASE_URL=https://test.api.amadeus.com
```
When unconfigured, it safely provides clearly labelled catalog demonstration data with real Indian airline routes (DEL, BOM, BLR, GOI).

### D. Razorpay Payment Gateway (Phase 3 Integration)
Server-side configuration:
```ini
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
```
Payment flow:
1. Authenticated user initiates checkout.
2. Server validates booking parameters and calculates price in paise.
3. Server creates an authoritative Razorpay order.
4. Client opens Razorpay Checkout modal.
5. Server cryptographically verifies the SHA-256 HMAC payment signature.
6. Webhooks handle asynchronous settlement and status synchronization.

---

## 8. Verified Endpoints & Health Check

### Health Check: `GET /api/v1/health`
Response:
```json
{
  "status": "ok",
  "service": "travelmitra-api",
  "version": "0.1.0",
  "timestamp": "2026-10-25T15:15:00.000Z",
  "uptime": 12,
  "database": "not-configured",
  "environment": "development"
}
```

### Preliminary Search Routes
- `GET /api/v1/flights/search?origin=DEL&destination=GOI&departureDate=2026-11-01&passengers=1`
- `GET /api/v1/hotels/search?city=Goa&checkInDate=2026-11-01&checkOutDate=2026-11-05`
- `GET /api/v1/packages/search?destination=Kerala`
- `GET /api/v1/auth/status`

---

## 9. Current Phase Status & Roadmap

- **Phase 1 (Completed):**
  - Full-stack npm workspaces structure
  - Express backend with security headers, CORS, logger, and health endpoint
  - React + Vite + Tailwind CSS + Lucide frontend
  - MakeMyTrip-inspired booking hero with Flight, Hotel, and Holiday Package tabs
  - Client-side form validation (React Hook Form + Zod)
  - 16 navigable routes with shared header, footer, and brand identity
  - Firebase & MongoDB Atlas scaffolding
  - Vitest & Supertest automated testing
  - GitHub Actions CI workflow
- **Phase 2 (Next Phase):**
  - Complete live Firebase Authentication flows (Google Sign-In, Email/Password, Password Reset)
  - Backend Firebase Admin ID token verification middleware
  - MongoDB Atlas user profile and trip syncing
- **Phase 3:**
  - Live Amadeus Flight API integration
  - Hotel partner booking engine
  - Razorpay checkout, server-side signature verification & webhooks
- **Phase 4:**
  - PDF E-ticket generation, WhatsApp notification updates, and review engine.

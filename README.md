# ConnectNest 🪺
### Neuro-Affirming Pediatric Support Network

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_%26_DB-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

**ConnectNest** is a modern, compassionate web platform designed to bridge the gap between families with neurodivergent children and verified, specialized pediatric support providers (speech therapists, occupational therapists, behavioral specialists, and developmental educators).

---

## 🌟 Key Features

### 👨‍👩‍👧 For Parents & Caregivers
- **Personalized Child Profiles**: Detail sensory preferences, diagnosis tags (Autism, ADHD, SPD, etc.), interests, and specific therapy requirements.
- **Tailored Matching Queue**: Submit specialized service requests with preferred session modes (in-person, online, or hybrid).
- **Session Tracking & Management**: Manage appointments, communicate with providers, and monitor session statuses.

### 🩺 For Providers & Specialists
- **Seamless Onboarding**: Submit credentials, professional license details, and CV documentation.
- **Profile & Availability Management**: Define hourly rates, service specialties, bio, and weekly availability slots.
- **Direct Parent Connections**: Receive matched sessions once vetted and approved by administrators.

### 🛡️ For Administrators
- **Vetting & Verification Queue**: Review provider qualifications, inspect uploaded licenses and CVs, and verify provider profiles.
- **Smart Allocation Engine**: Review parent service requests and assign the most suitable, vetted providers.
- **Platform Analytics**: Monitor overall user activity, session completions, and support inquiries.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling & UI**: Tailwind CSS v4, Framer Motion, Lucide React Icons
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security, Auth, Storage)
- **State & Server Actions**: Next.js Server Components, SSR Cookie Authentication

---

## 📁 Project Structure

```text
connectnest/
├── public/               # Static assets & brand media
├── src/
│   ├── app/
│   │   ├── (dashboard)/  # Role-based protected dashboards (Parent, Provider, Admin)
│   │   ├── (public)/     # Public marketing, directory, and auth routes
│   │   ├── layout.tsx    # Root application layout
│   │   └── globals.css   # Theme variables and global styles
│   ├── components/       # Reusable UI elements (Navbar, Footer, Modals, Cards)
│   ├── lib/              # Supabase SSR client utilities & helper functions
│   ├── types/            # TypeScript schemas and database types
│   └── middleware.ts     # Auth routing and session refresh middleware
├── supabase/
│   └── schema.sql        # Database schema, tables, triggers, and RLS policies
└── package.json          # Project configuration and dependencies
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Abigael-kanyago/connectnest.git
cd connectnest
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and populate your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Execute the SQL schema in [**`supabase/schema.sql`**](supabase/schema.sql) in your Supabase SQL Editor to initialize:
- Custom ENUM types (`user_role`, `session_mode_type`, `request_status_type`, `session_status_type`)
- Tables (`profiles`, `parent_profiles`, `provider_profiles`, `parent_requests`, `sessions`, `inquiries`)
- Row Level Security (RLS) policies and automated timestamp triggers.

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📄 License
This project is licensed under the MIT License.

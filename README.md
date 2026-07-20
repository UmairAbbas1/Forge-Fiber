# Forge & Fabric — Garment Production Tracker

A full-stack, role-gated industrial production management platform built for garment conversion factories. Forge & Fabric digitises and tracks every step of the cut-make-trim pipeline — from customer purchase order intake through final dispatch — giving merchandisers, production teams, QC auditors, and brand customers a unified, real-time view of live factory progress.

---

## Table of Contents

- [Overview](#overview)
- [Feature Set](#feature-set)
- [Architecture & Performance Architecture](#architecture--performance-architecture)
  - [Dual-Mode Engine (Supabase vs. Mock)](#dual-mode-engine-supabase-vs-mock)
  - [Server-Side Database Triggers & Notification Engine](#server-side-database-triggers--notification-engine)
  - [Server-Side Stage-Gate Enforcement](#server-side-stage-gate-enforcement)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Role & Access Control (RLS Aligned)](#role--access-control-rls-aligned)
- [The 13-Stage Production Pipeline & QC Gates](#the-13-stage-production-pipeline--qc-gates)
- [Database Schema & Migration Setup](#database-schema--migration-setup)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Supabase Production Setup](#supabase-production-setup)
- [Mock / Demo Mode](#mock--demo-mode)
- [Available Scripts](#available-scripts)
- [Application Pages](#application-pages)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Forge & Fabric is engineered specifically for **garment conversion manufacturers** — industrial facilities producing apparel from brand-supplied fabrics, trims, and tech pack specifications. The platform digitises the entire manufacturing lifecycle across 13 defined stages, from purchase order intake to packing and finished goods dispatch with proof of delivery.

Key Architectural Highlights:

- **Single Source of Truth** — Live operational data centralized in PostgreSQL with Realtime pub/sub replication.
- **Strict Role-Gated Workflows** — Tailored views and capabilities for Admins, Merchandisers, Production Floor Managers, QC Auditors, and Brand Customers.
- **High-Performance Hybrid Architecture** — Zero-freeze UI design: real Supabase mode runs PostgreSQL `SECURITY DEFINER` triggers and database-level indexing; offline/demo mode runs an in-memory client engine.
- **Automated Stage-Gate Protection** — Order progression is guarded server-side by database triggers that validate required upstream QC audits and production milestones.

---

## Feature Set

**Production Flow Dashboard**
- Live 13-stage pipeline matrix showing every active order and its current stage position.
- Interactive Kanban board layout with drag-and-advance quick action buttons.
- Per-stage active order counts, lead-time indicators, and drill-down details.
- Real-time notification warnings for delayed orders or pending QC checkpoints.

**Order Intake & Dashboard**
- Full order directory with instant search across order ID, PO number, tech pack reference, customer name, size, and status.
- Status filters: All / Open / In Production / On Hold / Shipped.
- Order creation modal with dynamic `FF-${max + 1}` ID sequence calculation (prevents primary key collisions) and inline customer brand registration.
- Normalized case-mapping for `PO_number` property synchronization between client models and REST APIs.
- Comprehensive Order Detail view (`/orders/:orderId`) with direct links to materials, cutting records, sewing bundles, wash batches, QC audit logs, and packing cartons.
- Order intake timeline and status distribution charts.

**Material Receiving & Inspection**
- Log incoming fabric, trim, and accessory receipts per order.
- Inspection status workflow: Pending → Approved / Hold.
- Holds trigger automated server-side notification alerts.

**Cutting Tracker**
- Track cut panels by size breakdown, color shade, and cutter name.
- First Cut Approval workflow: Pending → Approved / Rejected.
- Status tracking: In Progress / Completed.

**Sewing WIP & Bundle Control**
- Bundle-level tracking across assigned assembly lines.
- Track operator count and line throughput.
- Inline sewing inspection record capture: Pass / Rework / Reject.

**Wash & Specialty Finishing**
- Batch-level laundry wash tracking with stage progression: Wash → Dry → Finish → Approved.
- Equipment allocation for industrial washers, Jeanologia lasers, ozone booths, spray booths, and 3D wrinkle finish units.

**Quality Control (QC) Audits**
- Five formal QC checkpoints across the pipeline (Material Check, First Cut Panel Approval, Inline Sewing QC, Wash-Finish Approval, Final AQL-Packing Audit).
- AQL-based inspection results capture: Pass / Rework / Reject with inspected, pass, and defect counts.
- Pass rate KPIs, defect rate breakdowns, and checkpoint verification logs.

**Packing & Dispatch**
- Carton-level packing logs with packed quantities and order association.
- Dispatch workflow: Ready → Shipped.
- Proof of Delivery (POD) tracking reference and ship date logging.

**Reporting & CSV Export**
- Custom date-range reporting (defaults to last 30 days).
- Daily QC pass rate trend lines, on-time delivery percentages, and daily intake volume metrics.
- One-click CSV exports for orders, QC audit records, and dispatch carton data (restricted to Admin and QC roles).

**Admin Settings Panel**
- User management: view all user profiles, update roles, and manage user accounts.
- Brand Customer directory: register and update brand customer profiles with contact details (UUID auto-generated).
- Equipment registry: register machinery and toggle active operational status.
- AQL checkpoint configuration: customize acceptable quality limit percentages per checkpoint.

---

## Architecture & Performance Architecture

### Dual-Mode Engine (Supabase vs. Mock)

Forge & Fabric features a transparent dual-mode data layer:

1. **Live Supabase Mode (`isRealSupabase = true`)**: Activated when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured. All state changes run asynchronously against Supabase PostgreSQL over REST/Realtime.
2. **Offline / Demo Mode (`isRealSupabase = false`)**: Activated when environment keys are absent. Uses an in-memory client engine seeded from deterministic pseudo-random seed data (`mulberry32`) and persisted in `localStorage`.

### Server-Side Database Triggers & Notification Engine

In live Supabase mode, the audit engine runs on PostgreSQL using server-side `SECURITY DEFINER` trigger functions. This eliminates browser UI freezes and memory overhead:

- **Automated Audit Triggers**: Triggers on `materials`, `qc_records`, `orders`, and `cartons` automatically analyze records upon insert or update.
- **Database Deduplication**: Employs `INSERT ... ON CONFLICT (type, order_id) DO NOTHING` using a unique index on `notifications(type, order_id)` to ensure duplicate alerts are never created.
- **Security Definer**: Trigger functions execute with owner privileges, allowing non-admin roles (e.g. `production` or `qc`) to generate system notifications without violating Row Level Security (RLS).
- **Realtime Sync**: The React client subscribes to the `notifications` table via Supabase Realtime (`supabase_realtime` publication) for live header updates.

### Server-Side Stage-Gate Enforcement

Order pipeline progression is protected by a PostgreSQL `BEFORE UPDATE` trigger (`enforce_order_stage_gates`) on `public.orders`:

- **Server-Side Validation**: If a user attempts to advance an order's `current_stage`, the trigger verifies upstream dependencies directly in SQL.
- **Descriptive Exceptions**: If gate criteria are not met, PostgreSQL raises an exception with a specific error message (e.g., `"Requires an Inline Sewing QC record with result Pass or Rework"`).
- **User Feedback**: The React frontend catches these database errors and displays descriptive red toast notifications.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) v1 |
| UI Engine | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first directive layout) |
| Components | [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives) |
| State & Queries | TanStack Query v5 |
| Form Validation | React Hook Form v7 + Zod v3 |
| Charts & Data Vis | Recharts v2 |
| Icons | Lucide React |
| Backend & Database | [Supabase](https://supabase.com) (PostgreSQL 15+ with Auth & RLS) |
| Database Client | `@supabase/supabase-js` v2 |
| Primary Language | TypeScript 5 |
| Linting & Formatting | ESLint 9 + Prettier 3 |

---

## Project Structure

```
forge-flow-main/
├── public/
│   └── favicon.png               # Custom 'FF' monogram brand mark & favicon
├── src/
│   ├── components/
│   │   ├── AppShell.tsx          # Global shell layout, sidebar navigation, top header, notifications
│   │   └── ui/                   # shadcn/ui components (Dialog, Sheet, Toast, Dropdown, Tooltip)
│   ├── hooks/
│   │   ├── useAuth.tsx           # Authentication context (Supabase Auth + Mock login fallback)
│   │   ├── useAppData.tsx        # Central data provider, TanStack Query hooks, Realtime listeners
│   │   └── use-mobile.tsx        # Responsive viewport hook
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client initialization & Profile types
│   │   ├── mockData.ts           # Deterministic seed data, domain types, STAGES, QC_CHECKPOINTS
│   │   └── utils.ts              # Tailwind class merge helper (cn)
│   ├── routes/
│   │   ├── __root.tsx            # Application root route, global loading overlay, HTML head
│   │   ├── index.tsx             # Index route (redirects to /dashboard)
│   │   ├── login.tsx             # Authentication sign-in view
│   │   ├── signup.tsx            # User registration view
│   │   ├── dashboard.tsx         # Production Flow dashboard (Pipeline matrix & Kanban board)
│   │   ├── orders.tsx            # Order intake & order directory
│   │   ├── orders.$orderId.tsx   # Detailed order view with 13-stage breakdown
│   │   ├── materials.tsx         # Material receiving & inspection tracker
│   │   ├── cutting.tsx           # Panel cutting tracker & First Cut approvals
│   │   ├── sewing.tsx            # Sewing line WIP & bundle management
│   │   ├── wash.tsx              # Laundry wash batch & finishing allocation
│   │   ├── qc.tsx                # Quality control audit logs & AQL reports
│   │   ├── dispatch.tsx          # Packing cartons & proof-of-delivery tracking
│   │   ├── reports.tsx           # Analytics, KPI trends, and CSV exporter
│   │   └── settings.tsx          # Admin control panel (users, customers, equipment, AQL)
│   ├── router.tsx                # TanStack Router configuration
│   ├── routeTree.gen.ts          # Generated route tree definitions
│   └── styles.css                # Global stylesheet & Tailwind v4 config
├── supabase/
│   └── migrations/
│       ├── 20260714000000_init_schema.sql                # Base schema, enums, initial RLS & auth triggers
│       ├── 20260714000100_add_notes.sql                  # Added orders.notes column
│       ├── 20260714000200_add_customer_contact.sql        # Added customer contact & user deactivation fields
│       ├── 20260717000000_add_database_audit_triggers.sql# Server-side notification audit triggers & deduplication
│       ├── 20260717000100_add_crud_performance_and_gates.sql # Performance B-Tree indexes & Stage-Gate trigger
│       ├── 20260717000200_allow_merchandiser_customers.sql# RLS policy granting Merchandisers Customer write access
│       ├── 20260717000300_fix_triggers_security_definer.sql# SECURITY DEFINER update for notification triggers
│       ├── 20260717000400_security_definer_gates.sql      # SECURITY DEFINER update for stage-gate triggers
│       ├── 20260717000500_consolidated_production_fixes.sql # Single-paste consolidated production migration
│       ├── 20260717000600_allow_production_qc_records.sql# RLS policy granting Production write access on QC records
│       ├── 20260717000700_final_rls_policies_alignment.sql# RLS policy granting Production/QC Order update rights
│       └── 20260717000800_allow_qc_cartons.sql           # RLS policy granting QC write access on Cartons
├── .env                          # Local environment variables
├── components.json               # shadcn/ui configuration
├── package.json
└── vite.config.ts
```

---

## Role & Access Control (RLS Aligned)

Every authenticated user is assigned one of five roles. Access control is enforced both client-side via UI guards and server-side via Supabase Row Level Security (RLS) policies across all 9 database tables.

| Role | Target Audience | Table Write Access (RLS Aligned) | Primary UI Scope |
|---|---|---|---|
| `admin` | System Administrators & Factory Execs | Full `ALL` access across all 9 tables | Unrestricted access to all pages & Settings |
| `merchandiser` | Brand Merchandisers & Account Managers | `orders` (ALL), `customers` (ALL) | Order Dashboard, Order Creation, Detail Views |
| `production` | Floor Managers & Line Supervisors | `materials`, `cutting_records`, `sewing_bundles`, `wash_batches`, `qc_records`, `cartons` (ALL), `orders` (UPDATE stage) | Production Flow, Materials, Cutting, Sewing, Wash, QC, Dispatch |
| `qc` | Quality Control Inspectors & Auditors | `qc_records` (ALL), `cartons` (ALL), `orders` (UPDATE stage) | QC Audits, Production Flow, Dispatch, Reports |
| `customer` | Brand Customer Contacts | Read-Only (`SELECT`) scoped exclusively to their owned brand | Scoped Order Dashboard & Order Details |

**Customer Isolation**: Customer-scoped data isolation is enforced by joining `profiles → customers` on `customer_id` / `customer_name` in RLS policies. A customer account can never read or access another brand's orders, materials, or factory records.

---

## The 13-Stage Production Pipeline & QC Gates

### Production Stages

| Stage | Name | Input | Key Output |
|---|---|---|---|
| 1 | Customer Order Intake | Customer PO & Tech Pack | Internal Job Card |
| 2 | Raw Material Receiving | Fabric/Trim Shipments | Received Inventory Logs |
| 3 | Fabric & Trim Inspection | Material Stock | Approved / Held Materials |
| 4 | Pre-Production Planning | Approved Materials | Production Routing & Marker Plan |
| 5 | Pattern / Marker / Cutting | Fabric Rolls | Cut Panels by Size & Shade |
| 6 | Bundling & Line Feeding | Cut Panels | Numbered Sewing Bundles |
| 7 | Sewing Production | Sewing Bundles | Assembled Garments |
| 8 | Pre-Wash QC | Assembled Garments | Approved Garments for Finishing |
| 9 | Laundry / Wash / Dry | Unwashed Garments | Washed Garments |
| 10 | Laser / Ozone / Spray / 3D Finish | Washed Garments | Specialty-Finished Garments |
| 11 | Final Quality Inspection | Finished Garments | Final QC Audit Pass |
| 12 | Pressing / Tagging / Packing | Inspected Garments | Packed Shipping Cartons |
| 13 | Finished Goods Dispatch | Packed Cartons | Shipped Order with POD |

### QC Checkpoints & Gate Enforcement Rules

The database trigger `enforce_order_stage_gates` blocks advancement if gate criteria are unsatisfied:

| Gate Target | Required Condition | Error Message on Failure |
|---|---|---|
| **Gate to Stage 3** | Material record registered in `materials` | `"No material sourcing record exists for this order. Please register fabric arrivals first."` |
| **Gate to Stage 4** | All materials in `materials` set to `Approved` | `"Materials are not fully Approved yet — resolve all inspections before advancing to planning."` |
| **Gate to Stage 6** | Cutting record `status = 'Completed'` AND `first_cut_approval_status = 'Approved'` | `"Requires a Cutting record with status Completed and First Cut Approval set to Approved."` |
| **Gate to Stage 7** | Sewing bundle logged in `sewing_bundles` | `"No sewing bundle has been fed to the assembly line."` |
| **Gate to Stage 8** | Sewing bundles `status = 'Completed'` AND `qc_records` entry for `'Inline Sewing QC'` with `result != 'Reject'` | `"Requires an Inline Sewing QC record with result Pass or Rework (not Rejected) to proceed."` |
| **Gate to Stage 10** | Wash batch `stage` in `('Finish', 'Approved')` | `"Requires laundry wash batch to be completed to Finish or Approved stage."` |
| **Gate to Stage 11** | Wash batch `stage = 'Approved'` | `"Requires laundry wash batch status to be set to Approved."` |
| **Gate to Stage 13** | Carton `dispatch_status = 'Ready'` AND `qc_records` entry for `'Final AQL-Packing Audit'` with `result = 'Pass'` | `"Requires at least one packing carton with status Ready for dispatch and a passing Final AQL Audit."` |

---

## Database Schema & Migration Setup

The database consists of 9 core tables:

1. `profiles` — User accounts linked to `auth.users`. Stores `role` and `customer_id`.
2. `customers` — Customer brand directory with contact details.
3. `orders` — Central order entity storing PO details, tech pack reference, size breakdown, status, and current stage.
4. `materials` — Fabric, trim, and accessory inventory receipts.
5. `cutting_records` — Panel cutting logs and First Cut approval status.
6. `sewing_bundles` — Assembly line bundles with inline inspection status.
7. `wash_batches` — Laundry wash/finish batches and machinery allocation.
8. `qc_records` — AQL inspection records across all 5 defined checkpoints.
9. `cartons` — Packed cartons, dispatch status (`Ready` / `Shipped`), and POD tracking.

### Applying Migrations

For a clean setup on a new Supabase project, execute `supabase/migrations/20260717000500_consolidated_production_fixes.sql` or run all files in chronological order in the **Supabase SQL Editor**:

```bash
# Using Supabase CLI
supabase link --project-ref your-project-ref
supabase db push
```

---

## Getting Started

### Prerequisites

- Node.js 20+ or Bun 1.x
- A Supabase project (optional — runs fully in mock mode without environment keys)

### Installation

```bash
git clone https://github.com/your-org/forge-flow.git
cd forge-flow
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

When these keys are omitted, `isRealSupabase` automatically evaluates to `false` and the app runs in localStorage mock mode.

### Running Locally

```bash
npm run dev
```

The application launches on `http://localhost:3000`.

---

## Supabase Production Setup

1. **Database Schema**: Execute `20260717000500_consolidated_production_fixes.sql` in the Supabase SQL Editor.
2. **Realtime Replication**: Ensure `orders`, `qc_records`, `cartons`, and `notifications` are added to the `supabase_realtime` publication (handled automatically by the migration script).
3. **Admin User Registration**: Sign up via `/signup` and update your account's `role` to `'admin'` in the `public.profiles` table in the Supabase Dashboard.

---

## Mock / Demo Mode

When environment variables are absent, Forge & Fabric runs in demo mode.

**Demo Credentials** (Password for all accounts: `password123`)

| Email | Role | Scope |
|---|---|---|
| `admin@forgefabric.com` | Admin | Full Access & User Settings |
| `merch@forgefabric.com` | Merchandiser | Order Dashboard & Customer Creation |
| `prod@forgefabric.com` | Production | Materials, Cutting, Sewing, Wash, Dispatch |
| `qc@forgefabric.com` | QC Inspector | QC Audits, Checkpoints, Dispatch |
| `customer@forgefabric.com` | Customer | Scoped Order View (Levi Strauss & Co.) |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Compile production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Execute ESLint code checks |
| `npm run format` | Format codebase with Prettier |

---

## Application Pages

| Route | Title | Permitted Roles |
|---|---|---|
| `/login` | Sign In | Public |
| `/signup` | Sign Up | Public |
| `/dashboard` | Production Flow | Admin, Production, QC |
| `/orders` | Order Dashboard | Admin, Merchandiser, Customer |
| `/orders/:orderId` | Order Detail View | Admin, Merchandiser, QC, Customer |
| `/materials` | Material Receiving | Admin, Production, QC |
| `/cutting` | Cutting Tracker | Admin, Production, QC |
| `/sewing` | Sewing WIP | Admin, Production, QC |
| `/wash` | Wash & Finishing | Admin, Production, QC |
| `/qc` | QC Audits | Admin, Production, QC, Customer |
| `/dispatch` | Packing & Dispatch | Admin, Production, QC |
| `/reports` | Reporting & Export | Admin, QC |
| `/settings` | Admin Panel | Admin only |

---

## Deployment

Forge & Fabric is a TanStack Start SSR application. It can be deployed to Cloudflare Workers, Vercel, Netlify, or AWS Amplify:

Set Environment Variables on your hosting provider:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Build command: `npm run build`

---

## Contributing

1. Fork the repo and create a feature branch off `main`.
2. Ensure `npm run lint` and `npm run build` pass before submitting PRs.
3. Keep commit messages concise and descriptive.

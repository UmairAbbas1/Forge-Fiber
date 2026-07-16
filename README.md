# Forge & Fabric — Garment Production Tracker

A full-stack, role-gated production management platform built for garment conversion factories. Forge & Fabric tracks every step of the cut-make-trim pipeline — from customer purchase order intake through final dispatch — giving merchandisers, production teams, QC auditors, and brand customers a single shared view of live factory progress.

---

## Table of Contents

- [Overview](#overview)
- [Feature Set](#feature-set)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Role & Access Control](#role--access-control)
- [The 13-Stage Production Pipeline](#the-13-stage-production-pipeline)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Supabase Setup](#supabase-setup)
- [Mock / Demo Mode](#mock--demo-mode)
- [Available Scripts](#available-scripts)
- [Application Pages](#application-pages)
- [Notification System](#notification-system)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Forge & Fabric is designed for **conversion manufacturers** — factories that produce garments from customer-supplied materials and specifications. The platform digitises the entire production lifecycle across 13 defined stages, from receiving a brand's purchase order to shipping packed cartons with proof of delivery.

Key design goals:

- **Single source of truth** — All production data lives in one place, visible to every stakeholder at the appropriate access level.
- **Role-based views** — Admins, merchandisers, production staff, QC auditors, and brand customers each see only what is relevant to them, and can only modify what falls within their responsibility.
- **Dual-mode data layer** — Runs fully offline against localStorage mock data during development and demos, and switches automatically to live Supabase when environment credentials are present.
- **Stage-gate enforcement** — Orders cannot advance through the pipeline unless upstream QC checkpoints have been satisfied, preventing silent quality failures.

---

## Feature Set

**Production Flow Dashboard**
- Live 13-stage pipeline view showing every active order and its current position
- Kanban board view as an alternative layout
- Per-stage order count with quick drill-down
- Stage advancement controls with gate validation (QC checkpoints block advancement)
- Customer filter to isolate a specific brand's orders

**Order Dashboard**
- Full order list with search across order ID, PO number, tech pack reference, customer, size, and status
- Status filter: All / Open / In Production / On Hold / Shipped
- Add-order modal with inline brand creation
- Edit-order panel with status override
- Order-level detail page with a complete stage-by-stage breakdown, linked materials, cutting records, sewing bundles, wash batches, QC records, and cartons
- Order trend line chart (intake over last 30 days)
- Pie chart distribution by status

**Material Receiving**
- Log incoming fabric, trims, and accessories against an order
- Inspection status workflow: Pending → Approved / Hold
- Linked directly to the order it supports

**Cutting Tracker**
- Record cut panels per order, size, colour, and cutter
- First Cut Approval workflow: Pending → Approved / Rejected
- Status tracking: In Progress / Completed

**Sewing WIP**
- Bundle-level tracking across numbered sewing lines
- Operator count per bundle
- Inline QC result capture: Pass / Rework / Reject
- Line throughput KPIs

**Wash & Finishing**
- Batch-level wash tracking with stage progression: Wash → Dry → Finish → Approved
- Equipment allocation (industrial washers, Jeanologia lasers, ozone booths, spray booths, 3D wrinkle finish)

**Quality Control Audits**
- Five defined checkpoints across the pipeline (Material Check, First Cut Approval, Inline Sewing QC, Wash-Finish Approval, Final AQL/Packing Audit)
- AQL-based pass/reject/rework capture per inspection
- Overall pass rate and audit pass rate KPIs
- QC record creation with order search and checkpoint selection

**Packing & Dispatch**
- Carton-level packing records with packed quantity
- Dispatch status: Ready → Shipped
- POD (Proof of Delivery) reference and ship date capture

**Reporting & Export**
- Date-range filtered reporting (defaults to last 30 days)
- Daily QC pass rate trend line chart
- On-time delivery bar chart
- Orders created per day chart
- CSV export for orders, QC records, and dispatch data
- Access restricted to Admin and QC roles

**Admin Settings Panel**
- User management: view all user profiles, update roles, deactivate/reactivate accounts
- Customer directory: add and manage brand customers with contact information
- Equipment registry: add equipment, toggle active/inactive status
- AQL checkpoint configuration: update AQL limit values per checkpoint

**Notification System**
- Real-time audit engine scans all orders on every data change
- Five alert types: On Hold, QC Reject, Slow Stage, Overdue, and QC Checkpoint Pending
- Notification bell in the header with unread count badge
- Mark-as-read per notification

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) v1 |
| UI Library | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Component Library | [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives) |
| Data Fetching | TanStack Query v5 |
| Forms | React Hook Form v7 + Zod v3 |
| Charts | Recharts v2 |
| Icons | Lucide React |
| Backend / Auth | [Supabase](https://supabase.com) (PostgreSQL + Auth + RLS) |
| Supabase Client | `@supabase/supabase-js` v2 |
| Language | TypeScript 5 |
| Linting | ESLint 9 + typescript-eslint |
| Formatting | Prettier 3 |
| Package Manager | Bun / npm (both lock files present) |

---

## Project Structure

```
forge-flow-main/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── AppShell.tsx          # Global layout, sidebar nav, header, notifications
│   │   └── ui/                   # shadcn/ui component library
│   ├── hooks/
│   │   ├── useAuth.tsx           # Auth context (Supabase + mock mode)
│   │   ├── useAppData.tsx        # All production data, CRUD ops, notification engine
│   │   └── use-mobile.tsx        # Responsive breakpoint hook
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client, Profile type, mock profile store
│   │   ├── mockData.ts           # Seed data, domain types, STAGES, QC_CHECKPOINTS
│   │   └── utils.ts              # Tailwind class utility (cn)
│   ├── routes/
│   │   ├── __root.tsx            # Root layout with providers
│   │   ├── index.tsx             # Redirect to /dashboard
│   │   ├── login.tsx             # Sign-in page
│   │   ├── signup.tsx            # Registration page
│   │   ├── dashboard.tsx         # Production flow (pipeline / kanban)
│   │   ├── orders.tsx            # Order list and management
│   │   ├── orders.$orderId.tsx   # Order detail view
│   │   ├── materials.tsx         # Material receiving
│   │   ├── cutting.tsx           # Cutting tracker
│   │   ├── sewing.tsx            # Sewing WIP
│   │   ├── wash.tsx              # Wash & finishing
│   │   ├── qc.tsx                # QC audit records
│   │   ├── dispatch.tsx          # Packing & dispatch
│   │   ├── reports.tsx           # Reporting & CSV export
│   │   └── settings.tsx          # Admin panel
│   ├── router.tsx                # Router configuration
│   ├── routeTree.gen.ts          # Auto-generated route tree
│   ├── server.ts                 # TanStack Start server entry
│   ├── start.ts                  # Application entry point
│   └── styles.css                # Global styles + Tailwind v4 directives
├── supabase/
│   └── migrations/
│       ├── 20260714000000_init_schema.sql        # Full schema, enums, RLS, triggers
│       ├── 20260714000100_add_notes.sql          # orders.notes column
│       └── 20260714000200_add_customer_contact.sql  # customers.contact, profiles.deactivated
├── .env                          # Environment variables (not committed)
├── components.json               # shadcn/ui configuration
├── package.json
└── eslint.config.js
```

---

## Role & Access Control

Every authenticated user is assigned one of five roles. Navigation links, data mutations, and page access are all enforced client-side by `AppShell.tsx` and each route component, and at the database level by Supabase Row Level Security policies.

| Role | Access |
|---|---|
| `admin` | Full access to all pages, data, settings, and user management |
| `merchandiser` | Order dashboard only — can create and edit orders, no production data |
| `production` | Materials, Cutting, Sewing, Wash, QC, and Dispatch — all write access |
| `qc` | All production stages (read), QC records (write), Reporting (read) |
| `customer` | Read-only view of their own brand's orders and associated records |

Customer-scoped data isolation is enforced by joining `profiles → customers` on `customer_name` in every RLS policy that affects the customer role. A brand customer can never see another brand's orders, materials, or production data.

---

## The 13-Stage Production Pipeline

Orders progress through the following stages. Each stage has defined inputs, outputs, and associated equipment where applicable.

| Stage | Name | Key Output |
|---|---|---|
| 1 | Customer Order Intake | Internal job card |
| 2 | Raw Material Receiving | Received inventory log |
| 3 | Fabric & Trim Inspection | Approved / held materials |
| 4 | Pre-Production Planning | Production plan & routing |
| 5 | Pattern / Marker / Cutting | Cut panels by size and colour |
| 6 | Bundling & Line Feeding | Bundles to sewing line |
| 7 | Sewing Production | Stitched garments |
| 8 | Pre-Wash QC | Approved for finishing or repair |
| 9 | Laundry / Wash / Dry | Washed garments |
| 10 | Laser / Ozone / Spray / 3D Finish | Specialty-finished garments |
| 11 | Final Quality Inspection | Pass / rework / reject |
| 12 | Pressing / Tagging / Packing | Packed cartons |
| 13 | Finished Goods Dispatch | Shipped order with POD |

**QC gate checkpoints** are enforced between specific stages. An order cannot advance past a gate unless the corresponding QC record exists with an acceptable result:

| Checkpoint | Gates Stage |
|---|---|
| Material Check | After Stage 3 |
| First Cut Panel Approval | After Stage 5 |
| Inline Sewing QC | After Stage 7 |
| Wash / Finish Approval | After Stage 10 |
| Final AQL / Packing Audit | After Stage 12 |

---

## Database Schema

The production database consists of nine tables with full Row Level Security enabled on all of them.

**Core Tables**

- `profiles` — User accounts linked to `auth.users`. Stores role and optional `customer_id` reference.
- `customers` — Brand customer directory. Each customer has a unique name and contact email.
- `orders` — The central entity. Holds PO details, tech pack reference, size breakdown, quantity, status, and current stage.
- `materials` — Fabric, trim, and accessory receipts linked to an order.
- `cutting_records` — Panel cutting records per order, including first-cut approval status.
- `sewing_bundles` — Sewing line bundles with inline QC result.
- `wash_batches` — Wash/finish batches with stage progression.
- `qc_records` — AQL inspection records across all five checkpoints.
- `cartons` — Packed carton records with dispatch status and POD reference.

**Enums**

`role_type`, `order_status`, `qc_result`, `material_inspection_status`, `cutting_status`, `first_cut_approval`, `sewing_status`, `wash_stage`, `dispatch_status`

**Auth Trigger**

A PostgreSQL trigger (`on_auth_user_created`) fires on every new Supabase Auth signup and automatically creates a corresponding row in `profiles`, reading `role` and `customer_id` from `raw_user_meta_data`.

---

## Getting Started

### Prerequisites

- Node.js 20+ or Bun 1.x
- A Supabase project (or run entirely in mock mode without one)

### Installation

```bash
git clone https://github.com/your-org/forge-flow.git
cd forge-flow
npm install
# or
bun install
```

### Environment Variables

Create a `.env` file in the project root. The application works without Supabase credentials — it falls back to mock mode automatically when they are absent.

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

If both variables are empty or missing, `isRealSupabase` evaluates to `false` and the entire auth and data layer runs against `localStorage`.

### Running Locally

```bash
npm run dev
```

The application starts on `http://localhost:3000` by default.

---

## Supabase Setup

Run the migrations in order against your Supabase project.

**Using the Supabase CLI:**

```bash
supabase link --project-ref your-project-ref
supabase db push
```

**Manual execution:**

In the Supabase Dashboard, open the SQL editor and run each file in chronological order:

1. `supabase/migrations/20260714000000_init_schema.sql`
2. `supabase/migrations/20260714000100_add_notes.sql`
3. `supabase/migrations/20260714000200_add_customer_contact.sql`

After migrations run, all tables will have RLS enabled with policies scoped to each user role. No additional configuration is required.

**Creating the first admin user:**

Register via the `/signup` route and manually update the user's role in the Supabase Dashboard (`profiles` table), setting `role = 'admin'`. From that point, the admin can manage all other user roles through the in-app Settings panel.

---

## Mock / Demo Mode

When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not set, the application runs entirely in the browser with no backend dependency. All data is seeded from `src/lib/mockData.ts` and persisted in `localStorage` across sessions.

**Demo accounts** (password for all accounts: `password123`)

| Email | Role |
|---|---|
| `admin@forgefabric.com` | Admin |
| `merch@forgefabric.com` | Merchandiser |
| `prod@forgefabric.com` | Production |
| `qc@forgefabric.com` | QC |
| `customer@forgefabric.com` | Customer (Levi Strauss & Co.) |

The mock dataset includes:

- 42 seeded orders across 12 global denim brands (Levi's, H&M, Uniqlo, Zara, Gap, Diesel, Nudie Jeans, Wrangler, Lee Cooper, Pepe Jeans, American Eagle, Everlane)
- ~120 material records
- Cutting, sewing, wash, QC, and carton records generated from the order set
- 11 equipment records (cutters, sewing lines, washers, laser/ozone/spray/finishing machines)
- 5 AQL checkpoint configurations
- 7 brand customers with contact details

All mock data is generated with a seeded pseudo-random number generator (mulberry32, seed 42) so the dataset is deterministic and consistent across environments.

**Resetting mock data:** Clear `localStorage` in the browser's DevTools (Application → Local Storage → clear all `forge_flow_*` keys) and reload the page.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development-mode build (useful for debugging) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the entire project |
| `npm run format` | Format all files with Prettier |

---

## Application Pages

| Route | Title | Role Access |
|---|---|---|
| `/login` | Sign In | Public |
| `/signup` | Sign Up | Public |
| `/dashboard` | Production Flow | Admin, Production, QC |
| `/orders` | Order Dashboard | Admin, Merchandiser, Customer |
| `/orders/:orderId` | Order Detail | Admin, Merchandiser, QC, Customer |
| `/materials` | Material Receiving | Admin, Production, QC |
| `/cutting` | Cutting Tracker | Admin, Production, QC |
| `/sewing` | Sewing WIP | Admin, Production, QC |
| `/wash` | Wash & Finishing | Admin, Production, QC |
| `/qc` | QC Audits | Admin, Production, QC, Customer |
| `/dispatch` | Packing & Dispatch | Admin, Production, QC |
| `/reports` | Reporting & Export | Admin, QC |
| `/settings` | Admin Panel | Admin only |

---

## Notification System

The `useAppData` hook runs an audit engine on every state change. It scans all active orders and raises notifications for the following conditions:

| Type | Trigger Condition |
|---|---|
| `hold` | Order status is `On Hold` |
| `reject` | Any QC record for the order has result `Reject` |
| `slow_stage` | Order has been at the same stage for an extended period |
| `overdue` | Order creation date is older than the expected lead time threshold |
| `qc_checkpoint_pending` | Order has advanced past a QC gate stage but no corresponding QC record exists |

Notifications are displayed in the header bell icon with an unread count badge. Clicking a notification links directly to the relevant order. Each notification can be individually marked as read.

---

## Deployment

The project is a TanStack Start application and can be deployed to any platform that supports Node.js SSR or static export via Vite.

**Vercel / Netlify:**
Configure the build command as `npm run build` and the output directory as `dist`. Set the two Supabase environment variables in the platform's environment configuration.

**Environment variables required in production:**

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Ensure Supabase Auth is configured with the correct Site URL and any necessary redirect URLs under Authentication → URL Configuration in the Supabase Dashboard.

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Follow the existing code style — run `npm run lint` and `npm run format` before committing.
3. Keep commits scoped and descriptive.
4. Open a pull request against `main` with a clear description of the change and any testing steps.
5. Do not force-push or rebase commits that have already been pushed to the remote — this project is connected to Lovable and rewriting published history breaks the sync.

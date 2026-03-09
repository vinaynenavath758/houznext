# Houznext – Architecture & Roadmap

## Step 1: Architecture analysis

### High-level layout

| Part | Stack | Role |
|------|--------|------|
| **DC-backend-master** | NestJS, TypeORM, PostgreSQL | Single API: auth, CRM, cost/invoice estimators, property, orders, custom builder, branches, etc. |
| **dreamcasaWeb-master** | Next.js (customer app) | Public site + customer portal: interiors, cost calculator, login, user dashboard, custom builder, solar, referrals, etc. |
| **dreamcasaAdmin-master** | Next.js (admin app) | Admin portal: dashboard, CRM, cost estimator, invoice, branches, property, HR, legal, chat, etc. |

- **Auth**: JWT + NextAuth (customer). Admin uses same backend JWT; `ControllerAuthGuard` + branch/role context.
- **CRM**: Branch-scoped leads; `POST /crmlead/from-website` is public for interior calculator submissions.
- **CMS / Interiors**: Customer app uses Strapi for interiors content (`NEXT_PUBLIC_STRAPI_API`); backend is NestJS-only.

---

### Backend (DC-backend-master) – modules

**Core / infra**

- `AuthModule`, `UserModule`, `ConfigModule`, `TypeOrmModule`, `ScheduleModule`, `EventEmitterModule`, `S3Module`, `NotificationModule`, `TasksModule`, `AuditLogModule`, `RealtimeModule`.

**MVP-relevant (interiors / CRM / estimator)**

- `CRMLeadModule` – leads, branch-scoped, `from-website` for calculator.
- `CostEstimatorModule` – cost estimation.
- `InvoiceEstimatorModule` – invoice estimator.
- `BranchModule`, `BranchRoleModule`, `BranchRolePermissionModule`.
- `CityModule`, `StateModule` (geography).

**Property & listing**

- `PropertyModule`, `PropertyLeadModule`, `UnifiedPropertyListingModule`, `PropertyPremiumPlansModule`.

**Custom builder (large subtree)**

- `CustomBuilderModule`, `CustomerModule`, `LocationModule`, `DailyProgressModule`, `CustomPropertyModule`, `CBServiceModule`, `QueryModule`, `CbDocumentModule`, `PhaseModule`, `MaterialsModule`, `PaymentTrackingModule`, `PackageModule`.
- Sub-services: `BorewellModule`, `BrickMasonryModule`, `CentringModule`, `DocumentDraftingModule`, `ElectricityModule`, `FallCeilingModule`, `FlooringModule`, `PaintingModule`, `PlumbingModule`, `InteriorServiceModule`.

**Commerce & orders**

- `CartModule`, `OrdersModule`, `PaymentsModule`, `FurnitureModule`, `FurnitureLeadModule`, `HomeDecorsModule`, `ElectronicsModule`, `SolarOrdersModule`, `ShiprocketModule`.

**Other**

- `BlogModule`, `OtpModule`, `TestimonialModule`, `AddressModule`, `BuilderLeadsModule`, `ServiceCustomLeadModule`, `CareerAdminModule`, `CareerModule`, `ReviewsModule`, `WishlistModule`, `CompanyOnboardingModule`, `AwardModule`, `CompanyAddressModule`, `DeleteAccountModule`, `ContactUsModule`, `ResourceModule`, `ReferralModule`, `ReferAndEarnModule`, `ChatModule`, `ChatbotModule`, `HrModule`, `StaffAttendanceModule`, `FloorplansModule`, `WhatsAppModule`, plus legal services (branch-legal-service) and geography.

**Observations**

- Single `AppModule` imports 70+ modules; many are Custom Builder sub-services.
- Duplicate imports in `app.module.ts` (e.g. `PropertyModule`, `BrickMasonryModule`, `DocumentDraftingModule`, `CostEstimatorModule` listed twice).
- No clear “domain” grouping (e.g. a single `CustomBuilderDomainModule` that re-exports sub-services).
- Guard: `ControllerAuthGuard` + `Public()` for unauthenticated routes (e.g. `POST /crmlead/from-website`).

---

### Customer frontend (dreamcasaWeb-master)

- **Pages**: Home (interiors), cost calculator, login/signup, user dashboard (orders, profile, wishlist, testimonials, support, referrals, properties, company-property, custom-builder flows), solar, vaastu, terms, etc.
- **API**: `apiClient.js` with `NEXT_PUBLIC_LOCAL_API_ENDPOINT`; `crmleadFromWebsite` for calculator → CRM.
- **Layout**: GeneralLayout (header, main, footer); interior-focused nav (Interiors, Cost Calculator, Login).
- **Auth**: NextAuth + session; token used for authenticated API calls.

---

### Admin frontend (dreamcasaAdmin-master)

- **Sidebar**: Dashboard, Attendance, Premises, Branches, Blogs, Property, Projects, Home Decor, Electronics, Furnitures, Custom Builder, Cost Estimator, CRM, Chat, Invoice, Service Leads, Refer and Earn, General Queries, Testimonials, Human Resource, Legal Services, etc.
- **Tech**: Next.js, same API base; permission/branch stores; socket for chat/notifications.
- **Dashboard**: KPI cards and placeholder sections (from prior revamp).

---

### Data flow (simplified)

1. **Anonymous**: Customer visits site → Interiors / Cost calculator → `POST /crmlead/from-website` → lead in CRM (default branch).
2. **Customer**: Login (NextAuth) → JWT to backend → user-scoped and branch-scoped resources.
3. **Admin**: Login → JWT + branch/role → CRM, cost estimator, invoice, branches, etc.

---

## Step 2: Simplify modules (done)

- **Removed duplicate imports** in `app.module.ts`: `PropertyModule`, `BrickMasonryModule`, `DocumentDraftingModule`, `CostEstimatorModule` (each was listed twice).
- **Grouped imports** with section comments: Core & infra, Geography & branch, MVP (CRM, estimators, leads), Property & listing, Commerce & orders, Custom Builder (domain), Company onboarding, Other.
- **MVP-relevant modules** (for Interiors + CRM + Cost estimator + Invoice + Auth + Branches): AuthModule, UserModule, BranchModule, BranchRoleModule, BranchRolePermissionModule, CRMLeadModule, CostEstimatorModule, InvoiceEstimatorModule, StateModule, CityModule, plus core (Config, TypeORM, S3, Notification, etc.). Other modules (Solar, Shiprocket, Legal, etc.) remain for full product; can be lazy-loaded or feature-flagged later if desired.

---

## Step 3: Revamp frontend (done)

- **Navbar**: Simplified to **Interiors** (/)**, Cost Calculator** (/interiors/cost-estimator), **Contact Us**; **Login** remains as button. Removed “Post Property” CTA and large Services/Properties dropdowns.
- **BottomNav (mobile)**: Three items — **Interiors**, **Calculator**, **Account** (replacing Home, Properties, TrackHome, Cart, Profile).
- **Footer**: Two sections — **SERVICES** (Interiors, Cost Calculator, Contact Us) and **COMPANY** (About, Blogs, Careers, Refer & Earn, Terms, Privacy). Removed property-specific and extra service links.
- **Homepage**: `/` now renders the same content as `/interiors` (re-export from `pages/interiors`), so the main landing is interior-focused.

---

## Step 4: Revamp admin (done)

- **Sidebar**: Reduced to **Dashboard**, **CRM**, **Cost Estimator**, **Invoice**. Removed Attendance, Premises, Branches, Blogs, Property, Projects, Home Decor, Electronics, Furnitures, Custom Builder, Chat, Service Leads, Refer and Earn, General Queries, Testimonials, HR, Legal Services, Solar, Orders, Settings (and sublinks). Permission filtering by `table` (crm, cost_estimator, invoice_estimator) is unchanged; Dashboard always visible.
- **Dashboard nav**: Active on both `/` and `/dashboard`.
- **Home page (`/`)**: Revamped with greeting, last-login, and three KPI-style quick-link cards (CRM, Cost Estimator, Invoice) with hover states and clear labels.
- **Icons**: Unused sidebar icon imports removed from AdminLayout.

---

## Step 5: Optimize backend (done)

- **Indexes**: Added `@Index(['branchId'])` and `@Index(['userId'])` on `InvoiceEstimator` for list/filter queries; added `@Index(['branchId'])` on `CostEstimator`. CRM entity already had `@Index(['branchId', 'createdAt'])`, `@Index(['branchId', 'leadstatus'])`, `@Index(['Phonenumber'])`.
- **N+1**: CRM `findAll` uses `createQueryBuilder` with `leftJoinAndSelect` (assignedTo, assignedBy, createdBy); cost estimator `findAll` uses `leftJoinAndSelect` (postedBy, branch); invoice list uses single query. No N+1 in these list endpoints.
- **Rate limiting**: `FromWebsiteRateLimitGuard` added for `POST /crmlead/from-website` — 15 requests per 60 seconds per IP (sliding window, in-memory). Returns 429 when exceeded. Guard registered in CRM module and applied only to the from-website route.
- **Public routes**: Only `POST /crmlead/from-website` is `@Public()`; rate limit applied. For production at scale, consider Redis-based throttling or `@nestjs/throttler`.

---

## Summary

- **Step 1** is captured above: three-part architecture (NestJS backend, two Next.js apps), with backend module list and frontend scope.
- **Steps 2–5** are outlined as planned work; each can be broken into concrete tasks and implemented incrementally.

# Houznext MVP scope – segregated features

Only the following are **in scope**. All other features are **hidden from navigation** and treated as out of scope for this revamp.

---

## Customer app (dreamcasaWeb-master)

### In scope

| Feature | Route(s) | Notes |
|--------|-----------|------|
| **Interiors** | `/`, `/interiors` | Home and interiors landing. |
| **Interiors budget calculator** | `/interiors/cost-estimator` | Submits to CRM via `POST /crmlead/from-website`. |
| **Customer login** | Auth modal / NextAuth | Login/signup; session used for progress view. |
| **Interiors progress tracking** | `/user/custom-builder`, `/user/custom-builder/[id]/progressimages`, etc. | Post-login: list projects → view progress. Reflected from admin “Interior Progress” uploads. |

### Navigation (customer)

- **Navbar:** Interiors | Cost Calculator | Contact Us | Login (or Account when logged in).
- **BottomNav (mobile):** Interiors | Calculator | Account.
- **Footer:** SERVICES (Interiors, Cost Calculator, Contact Us); COMPANY (About us, Terms, Privacy).
- **Logged-in user menu (UserLayout):** Profile | My Interiors Progress only.

### Out of scope (hidden, not removed)

- Solar, Vaastu, other services (plumbing, packers, loans, etc.).
- Properties, Wishlist, Cart, Orders.
- Company Property, Testimonials, Referral Progress, Help/Support Inbox (unless re-added later).
- Dashboard, Refer and Earn, Blogs, Careers (still reachable via URL if needed).

---

## Admin app (houznext_Admin)

### In scope

| Feature | Route(s) | Notes |
|--------|-----------|------|
| **Dashboard** | `/`, `/dashboard` | Greeting and quick links to CRM, Cost Estimator, Invoice, Interior Progress. |
| **Cost estimator** | `/cost-estimator` | Interior cost estimates. |
| **CRM** | `/crm` | Leads & pipeline; calculator submissions land here. |
| **Invoice estimator** | `/invoice` | Invoices & billing. |
| **Interior progress** | `/interior-progress` | Upload / manage interior project progress. Data reflects in customer “My Interiors Progress”. Reuses Custom Builder list → select customer → Work Progress (DayProgress). |

### Navigation (admin)

- **Sidebar:** Dashboard | CRM | Cost Estimator | Invoice | Interior Progress (and User Profile in settings when present).
- Other admin routes (attendance, property, projects, blogs, etc.) are **out of scope** and not linked; they may still be reachable by URL.

---

## Design

- **Design language:** See [DESIGN.md](./DESIGN.md) (colors, typography, spacing, components).
- **Brand:** Primary `#2f80ed`, Accent `#f2994a`; contact Business@houznext.com, 8498823043.

---

## Redirects (optional)

To fully segregate, you can add redirects so out-of-scope URLs send users back:

- **Customer:** Redirect `/user/dashboard`, `/user/orders`, `/user/wishlist`, `/user/properties`, `/user/testimonials`, `/user/referralprogress`, `/solar/*`, `/services/*` (except interiors-related) → `/` or `/user/profile`.
- **Admin:** Redirect out-of-scope paths (e.g. `/property`, `/blogs`) → `/dashboard`.

These can be implemented in Next.js `next.config.js` or middleware.

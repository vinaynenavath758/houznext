# Houznext Design Language

Unified design system for the **Interiors MVP** (customer + admin).

## Principles

- **Clear hierarchy** – One primary action per screen; content over chrome.
- **Consistent spacing** – 4px base unit; use 8, 12, 16, 24, 32, 48 for rhythm.
- **Accessible** – Contrast and touch targets meet WCAG 2.1 AA.

---

## Colors

| Role        | Variable / usage        | Hex       |
|------------|--------------------------|----------|
| Primary    | `--houznext-primary`     | `#2f80ed` |
| Accent     | `--houznext-accent`      | `#f2994a` |
| Surface    | Headers, cards          | `#081221` (dark), `#ffffff` (light) |
| Text       | Primary                  | `#0f172a` (slate-900) |
| Text muted | Secondary                | `#64748b` (slate-500) |
| Border     | Dividers, outlines       | `#e2e8f0` (slate-200) |

Use **primary** for links, primary buttons, and active states. Use **accent** for secondary CTAs and highlights.

---

## Typography

- **Font**: Gordita (existing), fallback system stack.
- **Scale**:  
  - Page title: `text-2xl` / `text-3xl`, `font-bold`  
  - Section: `text-lg` / `text-xl`, `font-semibold`  
  - Body: `text-sm` / `text-base`  
  - Caption: `text-xs`, `text-slate-500`

---

## Spacing & layout

- **Base unit**: 4px.
- **Section padding**: `p-6` / `md:p-8` / `lg:p-10`.
- **Card padding**: `p-4` / `md:p-5` / `p-6`.
- **Gap between sections**: `space-y-6` / `gap-6`.

---

## Components

- **Cards**: `rounded-2xl`, `border border-slate-200`, `shadow-sm`; hover `shadow-md`, `border-[var(--houznext-primary)]/20`.
- **Buttons (primary)**: `bg-[#2f80ed]` (or `var(--houznext-primary)`), `text-white`, `rounded-xl`, `px-5 py-2.5`, `font-medium`.
- **Buttons (secondary)**: `border-2 border-[#2f80ed]`, `text-[#2f80ed]`, same padding/radius.
- **Inputs**: `rounded-xl`, `border border-slate-200`, `px-4 py-2.5`; focus `ring-2 ring-[#2f80ed]/20`, `border-[#2f80ed]`.

---

## Customer app – in scope

- **Interiors** (home)
- **Interiors budget calculator**
- **Customer login**
- **Interiors progress tracking** (post-login: list projects → view progress)

All other features (solar, services, property, orders, wishlist, referrals, etc.) are **out of scope** and hidden from navigation.

---

## Admin app – in scope

- **Dashboard**
- **Cost estimator**
- **CRM**
- **Invoice estimator**
- **Interior progress** – Upload / update progress for customer interior projects; data reflects in customer “Interiors progress tracking”.

All other admin features are **out of scope** and hidden from navigation.

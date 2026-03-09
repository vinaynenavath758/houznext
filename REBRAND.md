# Rebrand: OneCasa → Houznext

The codebase has been rebranded from **OneCasa** to **Houznext**. Name and tagline are no longer related to OneCasa.

## Contact & brand (current)

- **Email**: Business@houznext.com  
- **Phone**: +91 8498823043  
- **Primary color**: `#2f80ed`  
- **Accent color**: `#f2994a`  

CSS variables (customer app `global.css`): `--houznext-primary`, `--houznext-accent`.

## Changes applied

### Branding
- **Name**: OneCasa / One Casa / ONE CASA → **Houznext** / HOUZ + NEXT (logo text)
- **Tagline**: "One Roof Every Solution" → **"Your Next Home"**
- **Domain**: onecasa.in → **houznext.com** (in copy, links, SEO)
- **Email**: support@onecasa.in, help@onecasa.in → **support@houznext.com**, **help@houznext.com**
- **Social**: References updated to houznext (facebook.com/houznext, instagram.com/houznext, linkedin.com/company/houznext, youtube.com/@houznext)

### Where updated
- **Customer app (dreamcasaWeb-master)**: Navbar logo text & tagline, Footer contact & social links, SEO titles/descriptions/keywords on interiors and key pages, chatbot copy, verify-otp, support pages.
- **Admin app (dreamcasaAdmin-master)**: Sidebar logo (HOUZ/NEXT), tagline, dashboard SEO.
- **Backend (DC-backend-master)**: Guard message, CRM/WhatsApp/contact/referral/notification/customer emails and copy, user DTO examples, seed data, email templates (OTP, referral, etc.), main.ts API title, branch enum comment, GitHub workflow ECR name.

### What you should do next
1. **Logo & assets**: Replace `/images/logobw.png` and any OneCasa logos under `public/images` (customer and admin) with Houznext logos. Update email template image URLs if they point to your deployed site.
2. **Domain & email**: Configure **houznext.com** and **support@houznext.com** (and help@ if used). Update env (e.g. `NEXT_PUBLIC_APP_URL`, email from address) where needed.
3. **Social links**: Create/claim Facebook, Instagram, LinkedIn, YouTube for Houznext and update links if different from the placeholders above.
4. **Remaining pages**: Many customer app pages (e.g. blogs, careers, contact-us, other services) may still contain "OneCasa" or "onecasa.in" in SEO or body copy. Search for `OneCasa` and `onecasa` in `dreamcasaWeb-master/src` and replace with Houznext/houznext.com as needed.
5. **Design**: You asked that design not be similar to OneCasa. Current UI still uses the same layout and blue accent (#3586FF). For a distinct look, consider changing primary color, typography, or layout in your design system or theme.

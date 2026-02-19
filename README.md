# SINOVA'26 Website

Official website for **SINOVA'26 — HACK4IMPACT**, a national-level inter-collegiate hackathon hosted by SCMS School of Technology and Management (SSTM). The site covers event details, rules, sponsors, contact, registration workflow, payment verification, and an admin dashboard.

## Features

- High-impact landing and sponsors showcase
- About page with event overview and organizer details
- Registration flow with team size, member details, meal preference
- Payment screenshot OCR verification (Tesseract.js) + duplicate detection
- Supabase-backed team registration and waitlist handling
- Registration status lookup by team ID or leader email
- Contact form with email delivery via Resend
- Admin dashboard with exports and participant stats

## Routes

- `/` — Landing page
- `/about` — Event overview
- `/rules` — Rules & regulations
- `/register` — Team registration
- `/register/success` — Registration confirmation
- `/check-status` — Registration status lookup
- `/contact` — Coordinators + contact form
- `/adminsinova` — Admin dashboard

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Supabase (database + storage)
- Resend (email)
- Tesseract.js (OCR)
- XLSX (admin export)
- jsPDF (reporting utilities)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

Create a `.env.local` file (do not commit secrets):

```bash
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Notes:
- The contact form uses `RESEND_API_KEY` in `app/api/send-email/route.ts`.
- Supabase is configured in `lib/supabase.ts`.

## Project Structure (High Level)

- `app/` — Pages and API routes (App Router)
- `components/` — UI components
- `hooks/` — Custom hooks (payment verification)
- `lib/` — Utilities (Supabase client)
- `public/` — Static assets (logos, images)

## Admin Dashboard

The admin UI lives at `/adminsinova`. The access password is currently hardcoded in `app/adminsinova/page.tsx`. Change this before deploying.

## Deployment

This project is ready for Vercel or any Node.js host that supports Next.js. Ensure all environment variables are configured in your hosting provider.

## Credits

Built for the SINOVA'26 organizing team at SSTM.

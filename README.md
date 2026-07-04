# Jobbyist Webinar Series — Episode 1

**South Africa's Digital Labour Market** &middot; 13 August 2026, 8:00 PM SAST &middot; Zoom

A premium, enterprise-grade registration landing page for Jobbyist's Webinar Series,
built on Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion — with
real backend integrations for Supabase, HubSpot, Resend, and Zoom.

---

## ⚠️ Read this first — what's live vs. what needs your credentials

This is a genuinely complete, production-architected codebase, but it was written and
reviewed in a sandboxed environment **without live internet access or your real API
keys** — so nothing here has been run against an actual HubSpot portal, Zoom account,
or Resend domain. Here's exactly where things stand:

| Integration | Status | To activate |
|---|---|---|
| **Landing page UI/UX** | ✅ Complete | Nothing — works out of the box |
| **Multi-step RSVP form** | ✅ Complete | Nothing — validates, auto-saves, submits |
| **Supabase (registrations DB)** | ✅ Real code | Create a project, run `supabase/schema.sql`, set env vars |
| **ICS calendar file / Add-to-Calendar links** | ✅ Real code, no external API | Nothing |
| **QR code generation** | ✅ Real code, no external API | Nothing |
| **Resend confirmation email** | ✅ Real code | Verify a sending domain, set `RESEND_API_KEY` |
| **HubSpot CRM sync** | ✅ Real code | Create a Private App + custom properties (see below), set env vars |
| **Claude-powered chatbot** | ✅ Real code | Set `ANTHROPIC_API_KEY` |
| **Analytics (GA4/GTM/Meta/LinkedIn/Clarity/TikTok/HubSpot)** | ✅ Real snippets | Set each `NEXT_PUBLIC_*_ID` you use |
| **Zoom registrant creation** | ⚠️ Real code, needs your app | Create a Server-to-Server OAuth app; falls back to a static join URL until then |
| **Scheduled reminder emails (7d/3d/24h/1h/15m)** | ⚠️ Real code, unexercised | Deploy to Vercel (cron is pre-configured in `vercel.json`) or wire an external scheduler on Render |
| **Referral leaderboard** | ✅ Real code | Reads from the `referral_leaderboard` SQL view automatically |
| **Rate limiting** | ✅ Works without setup (in-memory) | For real serverless protection, add Upstash Redis env vars |

**Bottom line:** every integration is written against the real, documented API of each
service — not mocked — but you must run `npm install`, add your own credentials, and
smoke-test each one before relying on it in production. Treat the Zoom and cron
integrations with extra care since they're the least commonly pre-configured.

---

## Getting started

```bash
npm install
cp .env.example .env.local
# fill in at least NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# and SUPABASE_SERVICE_ROLE_KEY to get the RSVP flow fully working end-to-end
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run `supabase/schema.sql` in full.
3. Copy your Project URL, anon key, and service role key into `.env.local`.

### 2. Set up HubSpot (optional but recommended)

1. In HubSpot: **Settings → Integrations → Private Apps** → create one with scopes
   `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.lists.read`,
   `crm.lists.write`, and `timeline`.
2. Under **Settings → Properties → Contact properties**, create custom properties:
   `webinar_tags`, `registration_source`, `registration_code`, `province`,
   `employment_status`, `looking_for`, `utm_source`, `utm_medium`, `utm_campaign`,
   `utm_term`, `utm_content`, `hear_about_us`, `years_experience`, `linkedin_url`.
3. Create a static list named "Webinar Series" and copy its numeric ID into
   `HUBSPOT_WEBINAR_LIST_ID`.
4. (Optional) Set up a Timeline Event Template for a richer activity-log entry, and
   set `HUBSPOT_TIMELINE_TEMPLATE_ID`.

### 3. Set up Resend

1. Verify your sending domain at [resend.com](https://resend.com).
2. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`.

### 4. Set up Zoom (optional — falls back gracefully without it)

1. In the [Zoom Marketplace](https://marketplace.zoom.us), build a **Server-to-Server
   OAuth** app and grant it webinar scopes.
2. Set `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, `ZOOM_WEBINAR_ID`.
3. Until configured, every registrant simply receives `ZOOM_STATIC_JOIN_URL` instead
   of a personalised registrant link — the RSVP flow never fails because of this.

### 5. Set up the AI chatbot

Set `ANTHROPIC_API_KEY`. Without it, the chat widget still opens and responds with a
friendly fallback message pointing to the FAQ.

### 6. Analytics

Set any of the `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
`NEXT_PUBLIC_LINKEDIN_PARTNER_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID`,
or `NEXT_PUBLIC_HUBSPOT_TRACKING_ID` env vars — each script only loads if its ID is
present (see `components/AnalyticsScripts.tsx`).

---

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub (see below) and import it at
   [vercel.com/new](https://vercel.com/new).
2. Add every variable from `.env.example` under **Project Settings → Environment
   Variables**.
3. Deploy. The reminder-email cron in `vercel.json` (`/api/cron/reminders`, every 5
   minutes) activates automatically — Vercel sends `Authorization: Bearer
   $CRON_SECRET` for you as long as `CRON_SECRET` is set.

### Render

`render.yaml` defines a web service plus a companion cron job that pings
`/api/cron/reminders` on the same schedule, since Render doesn't have Vercel-style
built-in Next.js cron support. Set `CRON_TARGET_URL` to your deployed URL and
`CRON_SECRET` to match the web service's value.

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, JSON-LD, analytics
  page.tsx                Landing page composition
  globals.css             Tailwind layers + custom utilities
  robots.ts / sitemap.ts  SEO file-convention routes
  webinar/
    confirmed/[code]/     Shareable confirmation page (QR code destination)
    replay/               Post-event replay embed placeholder
  api/
    rsvp/route.ts         Main registration endpoint (Supabase → Zoom → HubSpot → Resend)
    ics/[id]/route.ts     Per-registration .ics file download
    chat/route.ts         Claude-powered chatbot endpoint
    referral/route.ts     Public referral leaderboard
    cron/reminders/route.ts  Scheduled reminder + replay email dispatcher

components/
  ui/                     Reusable primitives (Button, GlassCard, Icon, particles, etc.)
  sections/               Landing page sections (Hero, Prizes, Agenda, FAQ, ...)
  rsvp/                   Multi-step form (steps, progress bar, confirmation screen)
  Nav.tsx, Footer.tsx, Chatbot.tsx, StickyRSVPButton.tsx, AnalyticsScripts.tsx

lib/                      Integration clients + utilities (all framework-agnostic)
types/                    Shared TypeScript types
supabase/schema.sql       Full database schema + RLS policies
```

## Editable single-source-of-truth

Almost every piece of copy — event date, prizes, agenda, FAQ, provinces, referral
sources — lives in **`lib/constants.ts`**. Change it there and it propagates through
the UI, the confirmation email, and the JSON-LD structured data automatically.

## Security notes

- Row Level Security is enabled on every Supabase table; the public `anon` key can
  only `INSERT` into `registrations` — all reads happen server-side with the service
  role key.
- `/api/rsvp` and `/api/chat` are rate-limited per IP (Upstash Redis if configured,
  otherwise an in-memory fallback suitable for a single instance).
- A honeypot field (`website`) silently absorbs basic bots without a CAPTCHA.
- `/api/cron/reminders` requires a matching `Authorization: Bearer $CRON_SECRET`
  header.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, etc.) are set
  globally in `next.config.js`.

## Known limitations / next steps

- No automated test suite is included — given the number of external integrations,
  add integration tests (e.g. with mocked HubSpot/Zoom/Resend clients) before
  scaling traffic.
- The in-memory rate limiter resets on every serverless cold start; use Upstash in
  production.
- The guest-speaker notification signup currently just confirms client-side rather
  than writing to its own table — wire it to a dedicated Supabase table or HubSpot
  form if you want to track it separately from full registrations.
- `og-image.jpg` referenced in `app/layout.tsx` metadata is not included — drop a
  1200×630 image into `/public/og-image.jpg` (the two banner images you supplied are
  a great starting point).

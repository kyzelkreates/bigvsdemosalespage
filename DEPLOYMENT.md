# BIG V'S BEST ROUTES — VERCEL DEPLOYMENT GUIDE

## Quick Deploy

1. Push this project to GitHub
2. Import to Vercel at vercel.com/import
3. Set the environment variables below
4. Deploy — Vercel auto-runs `prisma generate && next build`
5. Visit `/auth/setup` on first load to create your owner account

---

## Required Environment Variables (Vercel Dashboard → Settings → Environment Variables)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Supabase/Neon/Railway) |
| `JWT_SECRET` | Random 32+ char string (`openssl rand -base64 32`) |
| `TEXTBEE_API_KEY` | Your TextBee API key |
| `TEXTBEE_DEVICE_ID` | Your TextBee device ID |
| `ADMIN_PHONE_NUMBER` | Your phone number for SMS alerts (e.g. +447...) |
| `NEXT_PUBLIC_SITE_URL` | Your domain e.g. `https://bigvsbestroutes.com` |

---

## Database Setup

### Option A: Supabase (Recommended)
1. Create project at supabase.com
2. Copy connection string from Settings → Database
3. Run: `npx prisma db push` (or it runs automatically on first deploy if you add it to build command)

### Option B: Neon (Serverless PostgreSQL)
1. Create project at neon.tech
2. Copy connection string
3. Add `?sslmode=require` to the end

### Option C: Railway
1. Create PostgreSQL at railway.app
2. Copy `DATABASE_URL` from Variables tab

---

## Build Command (already set in vercel.json)
```
prisma generate && next build
```

## First Deployment Flow
1. Deploy to Vercel
2. Visit: `https://yourdomain.com/auth/setup`
3. Create owner username + password (min 12 chars)
4. Setup screen locks permanently — only one owner allowed
5. Login at: `https://yourdomain.com/auth/login`

---

## Architecture Overview

| Path | Description |
|---|---|
| `/` | Marketing homepage (SEO landing) |
| `/features` | Feature list page |
| `/use-cases` | Industry use cases |
| `/demo` | Live fleet simulation dashboard |
| `/contact` | Lead capture form |
| `/install` | PWA install page |
| `/auth/setup` | First-time owner setup (locks after use) |
| `/auth/login` | Admin login |
| `/admin/dashboard` | Intelligence dashboard |
| `/admin/leads` | Lead CRM pipeline |
| `/admin/sms` | SMS config & delivery logs |
| `/admin/system` | System observability |
| `/admin/investor` | Investor-only KPI view |

---

## SMS Setup (TextBee)
1. Go to textbee.dev
2. Create account → Add device (install the TextBee Android app)
3. Copy API Key and Device ID into Vercel env vars
4. Set `ADMIN_PHONE_NUMBER` to your number
5. SMS fires automatically when leads score ≥ 80 or enterprise fleet

---

## PWA
- Auto-configured via `next-pwa`
- Manifest at `/manifest.json`
- Add icons to `/public/icons/` (sizes: 72, 96, 128, 144, 152, 192, 384, 512)
- Service worker auto-registered in production

---

## RBAC Roles
- **OWNER**: Full access to everything
- **ADMIN**: Fleet ops, leads, SMS — no investor view
- **INVESTOR**: Read-only analytics + investor dashboard

Create additional users directly in the database after setup.

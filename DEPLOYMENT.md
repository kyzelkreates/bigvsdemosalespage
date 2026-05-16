# BIG V'S BEST ROUTES — DEPLOYMENT GUIDE

> **No database required.** This platform runs entirely on Vercel + Vercel KV (serverless Redis).
> No Supabase. No PostgreSQL. No Prisma. Just deploy and go.

---

## Quick Deploy

1. Push repo to GitHub (already done)
2. Go to [vercel.com/import](https://vercel.com/import) → import `kyzelkreates/bigvsdemosalespage`
3. Add the environment variables below
4. Click **Deploy**
5. Visit `https://yourdomain.com/auth/setup` once to create your owner account
6. After that, access admin via the **5-tap logo easter egg** on the homepage footer

---

## Environment Variables

Add these in Vercel → Project → Settings → Environment Variables.

### Required

| Variable | Description | Where to get it |
|---|---|---|
| `JWT_SECRET` | Random 32+ char string | `openssl rand -base64 32` |
| `KV_REST_API_URL` | Vercel KV endpoint | Vercel → Storage → KV → `.env.local` tab |
| `KV_REST_API_TOKEN` | Vercel KV auth token | Same as above |

### Optional (can be set in Admin Dashboard instead)

| Variable | Description |
|---|---|
| `TEXTBEE_API_KEY` | TextBee API key — or set it live in Admin → SMS |
| `TEXTBEE_DEVICE_ID` | TextBee device ID — or set it live in Admin → SMS |
| `ADMIN_PHONE_NUMBER` | Your number for SMS alerts — or set it live in Admin → SMS |
| `NEXT_PUBLIC_SITE_URL` | Your domain e.g. `https://bigvsbestroutes.com` |

> **TextBee tip:** You don't need to set the SMS env vars before deploying.
> After first login, go to **Admin → SMS** and paste your credentials there.
> They're saved to your KV vault instantly — no redeployment needed.

---

## Vercel KV Setup (2 minutes)

1. In your Vercel project → **Storage** tab → **Create Database** → **KV**
2. Name it `bvr-store` (or anything)
3. Click **Connect to Project**
4. Vercel auto-injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` — you're done

---

## TextBee SMS Setup

1. Go to [textbee.dev](https://textbee.dev) → create account
2. Install the TextBee app on your Android phone
3. Register the device — copy the **Device ID**
4. Generate an **API Key** in the dashboard
5. In the admin panel → **SMS** → paste both values + your phone number
6. Hit **Test** — you'll receive a confirmation SMS immediately

---

## First Deployment Flow

1. Deploy to Vercel
2. Visit: `https://yourdomain.com/auth/setup`
3. Create your owner username + password (min 12 characters)
4. Setup locks permanently — only one owner ever
5. To access admin again: **tap the logo in the footer 5 times** → redirects to login
6. After login, go to **Admin → SMS** to configure TextBee

---

## Admin Shortcut (Easter Egg)

The homepage footer logo has a **5-tap hidden shortcut**:
- First time → takes you to `/auth/setup`
- After setup → takes you to `/auth/login`

No visible admin link is ever shown publicly.

---

## Site Routes

| Path | Description |
|---|---|
| `/` | Marketing homepage |
| `/features` | Feature breakdown |
| `/use-cases` | Industry use cases |
| `/demo` | Live fleet simulation dashboard |
| `/onboarding` | AI-powered 4-step questionnaire + quote |
| `/contact` | Lead capture form |
| `/install` | PWA install page |
| `/auth/setup` | First-time owner setup (one-time only) |
| `/auth/login` | Admin login |
| `/admin/dashboard` | Intelligence dashboard — leads, PWA, fleet, engagement metrics |
| `/admin/leads` | Lead CRM pipeline |
| `/admin/sms` | TextBee config + delivery log |
| `/admin/system` | Live system health checks |
| `/admin/investor` | Investor-only KPI view |

---

## AI Onboarding → SMS Flow

When a prospect completes `/onboarding`:

1. Their data is scored by the AI (fit score 0–100)
2. A quote range is calculated (£low – £high)
3. ROI is projected (fuel, time, cost savings)
4. **Two SMS messages fire to your phone:**
   - Lead card (name, company, contact, fleet size, score)
   - Full AI quote (investment range, scope, confidence %, annual ROI)

---

## Architecture

| Layer | Technology |
|---|---|
| Hosting | Vercel (Edge, London region) |
| Storage | Vercel KV (serverless Redis) |
| Auth | JWT sessions + KV-backed owner vault |
| SMS | TextBee (configurable in admin, no redeploy needed) |
| AI Engine | Serverless — built-in scoring & valuation |
| PWA | next-pwa + Web App Manifest |
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |

---

## PWA Icons

Add icons to `/public/icons/` in these sizes for full PWA support:
`72x72`, `96x96`, `128x128`, `144x144`, `152x152`, `192x192`, `384x384`, `512x512`

Format: `icon-{size}.png`

---

## Build Info

```
Build command:   next build
Install command: npm install
Output:          .next
Node version:    18.x or 20.x
Region:          lhr1 (London)
```

No `prisma generate`. No database migrations. Just `next build`.

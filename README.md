# Quintara — Deployment Guide

This is a real, standalone web app (not a Claude.ai artifact). It is verified to build and run correctly outside the Claude sandbox.

## What changed from the artifact version
- API calls now go to `/api/claude` (your own backend) instead of directly to Anthropic. This keeps your API key secret and adds rate limiting.
- `window.storage` (Claude-artifact-only) is now polyfilled by `src/storageShim.js`, backed by real browser `localStorage`. The app code itself did not need to change.
- The app icon is now a normal file (`public/icon-192.png`, `public/icon-512.png`) instead of a giant embedded base64 string.
- Added a PWA manifest so phones can "Add to Home Screen."

## One-time setup

### 1. Get an Anthropic API key
Go to https://console.anthropic.com, create a key. This is what the AI Oracle, Palm Reader, Tarot, and Numerology features use to actually call Claude. **Never put this key in frontend code** — it must only live on the server (Vercel environment variable).

### 2. Push this folder to GitHub
```
cd quintara-app
git init
git add .
git commit -m "Initial Quintara deploy"
git remote add origin https://github.com/yourusername/quintara.git
git push -u origin main
```

### 3. Deploy on Vercel (free tier is enough to start)
1. Go to https://vercel.com, sign up/log in with GitHub
2. Click "New Project," select your `quintara` repo
3. Vercel auto-detects Vite — leave build settings as default
4. Before deploying, go to "Environment Variables" and add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your real key from step 1
5. Click Deploy

You'll get a live URL like `quintara.vercel.app` within ~1 minute.

### 4. (Optional) Connect your own domain
In Vercel project settings → Domains → add `quintara.app` or whatever you own, follow the DNS instructions Vercel shows you.

## Local development (on a real computer with internet)
```
npm install
npm run dev
```
This won't have a working `/api/claude` locally unless you also run `vercel dev` (which reads your env var) instead of plain `vite dev`. For quick UI iteration, plain `npm run dev` is fine — the Oracle just won't get real responses until you use `vercel dev` or deploy.

## What's still NOT done (you must add before charging real money)
- **Payment gateway**: the Upgrade button is currently decorative. Wire up Razorpay or Stripe checkout before accepting real payments.
- **Refund Policy page**: legally required in India if you charge money.
- **Accurate ephemeris-based astrology**: current Sun/Moon/Ascendant logic uses simplified date-range approximations, not real planetary degree calculations. Fine for entertainment-tier launch; upgrade later with a library like `swisseph` if you want serious accuracy.
- **Production-grade rate limiting**: the current limiter resets when the serverless function cold-starts (acceptable for early launch, not for scale — upgrade to Upstash Redis later, see comment in `api/claude.js`).

## Files in this project
- `src/App.jsx` — the entire app (all pages, all logic)
- `src/storageShim.js` — makes persistence work via localStorage
- `src/main.jsx` — React entry point
- `api/claude.js` — secure backend proxy to Anthropic, with basic rate limiting
- `public/icon-192.png`, `public/icon-512.png` — app icons (real Quintara logo)
- `vite.config.js` — build + PWA config
- `vercel.json` — deployment routing config

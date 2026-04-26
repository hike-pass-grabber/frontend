# Hike Pass Grabber — Frontend

Web interface for Hike Pass Grabber, an automated BC Parks day-use pass monitoring system. Built with Next.js and deployed on Cloudflare Pages.

**Live:** https://hike-pass-grabber.pages.dev

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Cloudflare Pages

## Local Setup

```bash
npm install
cp .env.local.example .env.local
# fill in .env.local with your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.local.example` for the full list. The key variable:

| Name | Description |
|------|-------------|
| `NEXT_PUBLIC_API_URL` | URL of the backend API (e.g. `http://localhost:8000` for local dev) |

## Related Repos

All repos live under the [hike-pass-grabber](https://github.com/hike-pass-grabber) organization.

- [backend](https://github.com/hike-pass-grabber/backend) — FastAPI backend, BC Parks polling engine
- [database](https://github.com/hike-pass-grabber/database) — SQL migrations and seed data
- [local](https://github.com/hike-pass-grabber/local) — Downloadable local program for pass automation

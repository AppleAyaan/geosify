# Geosify

AI-powered land intelligence platform for investors. Discover vacant land and development opportunities visually on a map.

## Features

- Premium marketing landing page with embedded map preview
- Full-screen interactive map at `/explore`
- Real Mapbox imagery with parcel polygons (Waterloo, ON demo data)
- Search, filters, and parcel analysis panel
- Investment scores and mock AI insights

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and add your Mapbox token:

```bash
cp .env.local.example .env.local
```

Get a free token at [mapbox.com](https://www.mapbox.com/).

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or [http://localhost:3000/explore](http://localhost:3000/explore) for the map.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Mapbox GL JS
- Framer Motion
- Zustand

## Project Structure

- `src/app/page.tsx` — Marketing landing page
- `src/app/explore/page.tsx` — Full interactive map
- `src/components/landing/` — Landing page sections
- `src/components/map/` — Mapbox integration
- `src/lib/data/` — Mock parcel data (Waterloo, ON)

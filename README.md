# Machine Room Coffee

**Live demo → https://machine-room-coffee.vercel.app**

The demo auto-deploys from this repository's `main` branch, so every merge into it is already live.

A scroll driven landing page for a fictional specialty coffee roastery and espresso bar, built as a demo of animated, conversion minded web design.

**One offer, one audience, one action:** reserve a table.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Icons | Phosphor |
| Typefaces | Geist, Geist Mono |
| Images | Unsplash (free license, downloaded into `public/images`) |

All content is in English and all brand data (name, address, testimonials, menu) is fictional.

## The page, in order

1. **Hero** with a gradient headline, a per line masked reveal, an animated steam SVG, and a parallax image plus stat chips.
2. **Tagline reveal** — the house rule in giant type. Words start at 30% opacity and activate one at a time as each word crosses a trigger line while you scroll.
3. **Story scenes** — a simulated fly through. A sticky stage of four scenes (facade, main room, espresso bar, roastery). Vertical scroll drives a continuous dive: each scene zooms from the outside into its interior picture, fades out, and hands over to the next one with no cuts.
4. **Stats band** with count up numbers as the section enters the viewport.
5. **Menu** — a five card board that slides horizontally while the page scrolls vertically, with a progress rail.
6. **Roastery** — the behind the glass story with wholesale CTA.
7. **Gallery** — three photo columns drifting at different speeds (parallax columns) with a hover magnifier on each photo.
8. **Testimonials** — cards that stack like a deck while scrolling.
9. **FAQ** — an accordion with JSON LD schema for answer engines.
10. **Reservations** — the single conversion. A validated form (client side validation, inline errors, sending and success states) with hours and contact next to it.
11. **Footer** with hours, address, legal links, and a branded 404 at `app/not-found.tsx`.

## Motion rules the code follows

- Every transition uses the fluid easing `cubic-bezier(0.32, 0.72, 0, 1)`.
- Scroll reveals use `IntersectionObserver` / `whileInView` with `translate-y-16 blur-md opacity-0` resolving over 800ms or longer. There are no raw `scroll` event listeners anywhere.
- All animation is transform and opacity only, so it stays cheap on mobile.
- `prefers-reduced-motion` switches the fly through, the horizontal menu, and the counters to honest static versions.

## Design tokens

The palette, spacing, radii, and type scale follow a strict system defined in `app/globals.css`:

- Dark backgrounds limited to `#131209`, `#181818`, `#1f1f1f`, `#272727`.
- Warm flat accent `#c97b28` on all interactive elements.
- Text gradient allowed only on the hero heading (white to `#9b9b9b`), per the visual system.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
app/            layout (metadata, SEO, social), page composition, global styles, 404, icon
components/     one client component per section + shared Reveal animation
lib/data.ts     all copy, menu, scenes, testimonials, FAQ schema source
public/images/  downloaded Unsplash photography
.opencode/skills/  design skills used to author the page
```

## Deploy

Designed for Vercel's free Hobby plan: push the repository to GitHub, import it at vercel.com, and every push deploys automatically. No environment variables are required.

# Engineering notes

Supplementary detail for [Little Lemon (Web)](../README.md) — kept out of the
README so it stays lean.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` / `npm run dev` | Start the Vite dev server |
| `npm test` | Run the Vitest + Testing Library suite |
| `npm run lint` | Lint (React, Hooks, jsx-a11y rules) |
| `npm run format` | Format with Prettier |
| `npm run build` | Production build to `dist/` |
| `npm run deploy` | Build and publish to GitHub Pages |

Every push and pull request runs **format → lint → test → build** in CI.

## Project structure

```
src/
  components/   UI, the booking form, and the times reducer
  styles/       per-component CSS
  api.js        mock reservations API (Meta spec)
```

## Accessibility

Keyboard-operable throughout, a focus-trapped contact dialog that restores
focus on close, ARIA-described form errors, `alt` text on every image, and
labelled star ratings.

## Testing

12 tests (Vitest + React Testing Library) cover the booking flow — valid
submits pass the data through, invalid and past-date submits are blocked, and
changing the date requests that day's times.

## Roadmap

Done: an error boundary around the routes, the booking reducer split into
its own module (Fast Refresh), and lazy-loaded below-the-fold images.

Planned:

1. TypeScript for type-safe props
2. Surface submit failures in the UI (once the API can actually fail)

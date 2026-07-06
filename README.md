# Little Lemon (Web)

A restaurant website built with React: browse the highlights and testimonials, then book a table with a validated reservation form. Part of the Meta Front-End Developer certification, and one of three Little Lemon capstones — see the [iOS](https://github.com/A-bv/Capstone-iOS) and [React Native](https://github.com/A-bv/Capstone-react-native) versions.

**Live site: [a-bv.github.io/Capstone-react](https://a-bv.github.io/Capstone-react/)**

[![CI](https://github.com/A-bv/Capstone-react/actions/workflows/ci.yml/badge.svg)](https://github.com/A-bv/Capstone-react/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

## Features

- **Home page** — hero, daily specials, customer testimonials, and an about section.
- **Booking page** — a reservation form with field validation.
- **Responsive design** — optimized for both mobile and desktop views.
- **Dynamic navigation** — smooth scrolling and modal pop-ups for contact information.
- **Follows the prototype** — the Figma file (`wireframe-little-lemon-react.fig`) is included in the repository.

## Build & run

Requires Node.js and npm.

```bash
git clone https://github.com/A-bv/Capstone-react.git
cd Capstone-react
npm install
npm start
```

The site runs at `http://localhost:5173/Capstone-react/`.

## Tests

Automated unit tests (React Testing Library + Vitest) cover the booking form and routing. CI also checks formatting and linting on every push.

```bash
npm test
```

## Deploy

The site is published to GitHub Pages with:

```bash
npm run deploy
```

## License

MIT. See [LICENSE](LICENSE).

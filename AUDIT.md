# Portfolio-Grade Audit — Little Lemon (Capstone-react)

_Staff-engineer audit. Audit only — no code was modified. Date: 2026-07-01. Branch: `main`, clean (only untracked `.claude/`), up to date with `origin/main`._

## Ground truth (established, not assumed)

- **What it is:** a client-side React **single-page app** — a static marketing/reservation site, not a library or service. Deployed to GitHub Pages under base `/Capstone-react/` using `HashRouter`. Confirmed from `App.js`, `vite.config.mjs`, `package.json` (`gh-pages -d dist`).
- **Toolchain (from lockfile/manifest):** React 18.3.1, react-router-dom 6.25.1, Vite 5.4.21, Vitest 2.1.9, Testing Library. JavaScript (not TypeScript). JSX kept in `.js` files (CRA legacy), parsed via an esbuild loader override in `vite.config.mjs`.
- **Build:** ✅ passes — `vite build`, 66 modules, ~470ms, assets emitted under `/Capstone-react/`. Verified the built `dist/index.html` correctly rewrites favicon/manifest to the base path (no 404 there).
- **Tests:** ✅ 8/8 pass across 3 files (`App.test.js` 1, `Booking.test.js` 3, `BookingForm.test.js` 4).
- **Lint / typecheck / CI:** ❌ none. No ESLint/Prettier config, no lint script, no `.github/workflows`.
- **Security:** `npm audit` → 5 vulns (1 critical, 1 high, 3 moderate), **all** in the dev toolchain (esbuild/vite/vitest). Verified via `npm audit --json`: none are in code shipped to the static build.

---

## 1. Verdict

This is a **competent, working L1 app with L0 scaffolding gaps and a coursework residue that reads at L2/L3.** The architecture is sound for its size — clean component decomposition, a real `useReducer` + mock-API pattern that matches the Meta spec, an accessible booking form (`aria-invalid`/`aria-describedby`/`role="alert"`), a proper focus-managed modal, and the correct `HashRouter` choice for GitHub Pages project pages. Nothing is structurally broken; the build and tests are green. The gap to a top-tier showcase is not correctness — it's **maturity and finish**: there is no lint/CI gate (the single biggest deep gap for "something others depend on"), the one real domain feature (booking) has a correctness hole (past dates accepted) and tests that don't actually exercise submit, and the repo still carries visible tutorial scaffolding (dead `reportWebVitals`, CRA-default `manifest.json`, `// Add this line` comments, README pointing at the wrong port and the wrong test runner). Deep-first: close the L0 tooling gap and the L1 date bug before polishing.

---

## 2. Findings (deep → shallow)

### L0 — Foundation

**FOLLOW-UP [L0 · Works→Senior] (Observed)** — No CI pipeline. `ls .github/workflows` → absent.
For a repo positioned as depended-on, there is no automated gate that build/tests stay green.
→ Add a GitHub Actions workflow running `npm ci && lint && test && build` on PR/push.

**FIX-BEFORE-MERGE [L0 · Works→Senior] (Observed)** — No linting/formatting layer at all. The CRA→Vite migration (commit `6b215fe`) dropped the built-in ESLint and nothing replaced it. A React portfolio with zero linting reads as unfinished.
→ Add ESLint (`eslint-plugin-react`, `react-hooks`, `jsx-a11y`) + Prettier; wire a `lint` script.

> **Update (fix in progress — ESLint 9 flat config landed):** Adopting the gate corrected and surfaced several things:
> - The two `eslint-disable-next-line react-hooks/exhaustive-deps` directives at `BookingForm.js:63` / `Nav.js:30` are **not dead** — `reportUnusedDisableDirectives` confirms they still actively suppress a real `exhaustive-deps` warning. The earlier "dead directives" note was an inference and is **withdrawn**.
> - `react-in-jsx-scope` fired on `App.test.js` (the one file not importing React); fixed with a one-line import to match the repo's convention.
> - Prettier is **split into its own finding** (see ranked list): a `--write` sweep rewrites every file's indentation and would bury the gate setup in an unreviewable diff.
> - New violations surfaced and demoted to warnings for a green baseline — see **Lint-surfaced debt** below.

**RESOLVED [L0] (Observed)** — JSX used to live in `.js` files, needing an esbuild loader hack in `vite.config.mjs`. This was fine on esbuild-based Vite (≤7) but Vite 8 replaces esbuild with Rolldown/oxc, which ignores the hack (`JSX syntax is disabled`). **Fixed (see #11):** the 14 JSX-bearing files were renamed to `.jsx` and the loader hack removed, so Vite handles them natively — unblocking the Vite 8 upgrade in #8. (TypeScript remains a further, optional modernization.)

### L1 — Behavior / Correctness

**FIX-BEFORE-MERGE [L1 · Works→Correct] (Observed)** — **Booking form accepts past dates.** `src/components/BookingForm.js` — the date `InputField` has no `min`, and `validateField('date')` only checks non-empty (`:84`). You can reserve a table for yesterday. This is the core domain rule of a reservation app.
→ Set `min={todayISO}` on the date input and reject `date < today` in `validateField`.

**FOLLOW-UP [L1 · Works→Correct] (Observed)** — ~~**Time can submit empty and is never validated.**~~ **Corrected:** I enumerated the seeded `fetchAPI` for every day-of-month (1–31); the minimum is **4** slots and it is **never empty**, and `time` always defaults to a valid slot. So an empty-time submission is **not reachable** via the current mock — the earlier claim is withdrawn.
→ Still worth a defensive guard (the mock explicitly stands in for a real backend): `time`-required validation + a disabled "no availability" placeholder were added, but they are defensive, not fixing a live bug.

**FOLLOW-UP [L1 · Works→Senior] (Observed)** — Dev-toolchain vulnerabilities: 1 critical (Vitest UI arbitrary file read/exec — UI server not used here), 1 high + 3 moderate (Vite/esbuild dev-server path traversal & request bypass). Verified all are dev-only; **none ship in the static `dist/` build**, so live-site risk is ~nil. But a depended-on repo should stay current.
→ Bump Vite 5→7 and Vitest 2→3 (`npm audit fix --force` equivalent), then re-run the suite.

### L2 — Surface (API / docs / things others touch)

**FIX-BEFORE-MERGE [L2 · Works→Correct] (Observed)** — README inaccuracies. `README.md:56` claims the dev server runs at `http://localhost:3000` (Vite serves **5173**, and under `/Capstone-react/`). `README.md:68` says tests use "React Testing Library + **Jest**" — the project runs **Vitest**. Anyone following the README hits friction immediately.
→ Fix the port/path and the test-runner name.

**FIX-BEFORE-MERGE [L2 · Works→Showcase] (Observed)** — Tutorial residue in source. `src/components/BookingForm.js` carries `// Add this line` ×4 (`:147,:159,:171,:192`); `src/App.test.js` still has `// Replace "learn react" with actual text…`. These read as pasted-from-coursework rather than authored. Cheap, high-signal cleanup.
→ Delete the instructional comments.

**FOLLOW-UP [L2 · Works→Showcase] (Observed)** — `public/manifest.json` is still Create React App boilerplate: `"name": "Create React App Sample"`, `"short_name": "React App"`. PWA identity is wrong for a "Little Lemon" showcase.
→ Set real name/short_name/theme.

**FOLLOW-UP [L2 · Works→Senior] (Observed)** — Dead code. `src/reportWebVitals.js` is defined and exported but **never imported** (verified: `index.js` doesn't reference it; grep finds no caller). Its only consumer of the `web-vitals` dependency is itself, so `web-vitals` is effectively an unused prod dependency — and it's pinned to v2 using the deprecated `getFID`/`getCLS` API.
→ Remove `reportWebVitals.js` + the `web-vitals` dep, or actually wire it to an analytics sink.

**FOLLOW-UP [L1/L2 · Works→Senior] (Observed)** — Tests are broad but shallow; they don't cover the actual booking behavior. `BookingForm.test.js`'s "fills out the form correctly" only asserts inputs hold values — it never asserts `submitForm` is called on a valid submit, never asserts an invalid submit is **blocked**, and there's no component-level test of the date→times reducer wiring, `ContactModal`, or `Nav`. Coverage breadth on the one real feature (submit/validation happy + sad path) is effectively zero.
→ Add: valid submit calls `submitForm` with form data; invalid submit does not; changing the date dispatches `UPDATE_TIMES`.

### Lint-surfaced debt (demoted to warnings on ESLint adoption)

These were surfaced by the new gate and set to `warn` so the baseline is green; each is promoted back to `error` when fixed.

**RESOLVED [L1 · Works→Senior] (Observed)** — ~~`react-hooks/set-state-in-effect` at `BookingForm.js:61`~~. The "keep selected time valid" effect called `setFormData` synchronously in an effect body (cascading-render smell). **Fixed:** the effect is gone; the selected time is now derived during render (`selectedTime`, clamped to `availableTimes`) and used for the field value, validation, and the submit payload. Verified in-browser: the shown time is always a valid slot across date changes. Rule promoted to `error` once Nav's violation is also cleared.

**RESOLVED [L3 · Works→Senior] (Observed)** — ~~`react-hooks/set-state-in-effect` at `Nav.js:28`~~. The deferred-scroll effect set `pendingScroll(false)` inside the effect. **Fixed:** `pendingScroll` is now a `useRef` (flipping it shouldn't re-render), and the scroll helper is memoized so the effect deps are honest (the `exhaustive-deps` disable is gone too). With BookingForm's fix, `react-hooks/set-state-in-effect` is promoted back to `error`.

**RESOLVED [L3 · Works→Senior] (Observed)** — ~~`jsx-a11y/click-events-have-key-events` + `jsx-a11y/no-static-element-interactions` at `ContactModal.js:29`~~. The overlay `<div onClick=…>` had no keyboard equivalent / role. **Fixed:** the backdrop-click handler is now attached imperatively in an effect (not a JSX prop), since backdrop click is a mouse-only affordance and keyboard users dismiss via Escape / the Close button / the focus trap. Both rules are promoted back to `error`; the lint gate is now fully clean at recommended severity.

### L3 — Polish

**RESOLVED [L3] (Observed, verified in browser)** — `Nav` "About"/"Contact" used `<a href="#about">` / `#contact` under `HashRouter`, mutating the routing hash as a side effect. **Fixed:** both are now `<button type="button">` (styled to match the links — computed styles verified identical), so no stray hash mutation; and a catch-all `<Route path="*">` now redirects unknown paths home (verified: a bogus hash lands back on home).

**RESOLVED [L3] (Observed, verified in browser)** — `ContactModal` moved focus in and closed on Escape/overlay, but Tab focus was **not trapped**, focus wasn't restored to the trigger on close, and it didn't close on route change. **Fixed:** added a Tab focus trap (verified — Tab stays in the dialog) and focus restore to the trigger on close (standard save-`activeElement`/restore pattern; correct by construction but not verifiable in the headless preview, which can't own OS focus). **Close-on-route-change deliberately skipped:** the full-screen overlay already blocks background nav, so it would only matter for browser back/forward, and a clean implementation would reintroduce the exact set-state-in-effect just removed — not worth it for that edge.

**RESOLVED [L3] (Observed, verified)** — `Testimonials` rendered ratings as bare `★` glyphs with no `aria-label`. **Fixed:** the rating wrapper is now `role="img"` with an `aria-label` like "4 out of 5 stars" (verified in-browser), so screen readers get meaning, not symbols.

**RESOLVED [L3] (Observed, verified)** — Minor taste: `SelectField` used `key={index}` (fixed in #4 → `key={option}`); `Footer` hardcoded `© 2024` (now `© {current year}`, verified showing 2026).

---

## 3. Ranked action list (deepest gap first — the fix queue)

1. **Stand up ESLint (react/react-hooks/jsx-a11y) + a `lint` script.** [L0] ✅ _done — ESLint 9 flat config, green baseline._
2. **Add Prettier + format sweep** (config, `format`/`format:check` scripts, `eslint-config-prettier`, one `--write` pass). [L0] ✅ _done — 4-space/single-quote config matching existing style; JSON kept at 2-space; JS bundle hash unchanged._
3. **Add a GitHub Actions CI workflow** running `lint → test → build` on push/PR. [L0] ✅ _done — `.github/workflows/ci.yml` on Node 22; also runs `format:check` (enforces #2). Full sequence verified locally incl. clean `npm ci`._
4. **Fix the past-date booking bug** (`min` + validation) and reject empty `time`. [L1] ✅ _done — native `min` + React past-date validation (verified in browser: past date blocked, valid future booking still confirms). Empty-time guard added as defense; the mock never actually returns zero slots._
5. **Deepen the tests**: assert valid submit calls `submitForm`, invalid submit is blocked, date-change updates times. [L1/L2] ✅ _done — refactored to a per-test render helper; added 4 behavior tests (valid submit payload, invalid submit blocked, past-date blocked, `UPDATE_TIMES` dispatched). Suite 8 → 12._
6. **Fix README** (port 5173/base path, Vitest not Jest). [L2] ✅ _done — dev URL now `http://localhost:5173/Capstone-react/`; test runner named as Vitest._
7. **Remove tutorial residue**: `reportWebVitals.js` + `web-vitals` dep, `// Add this line` comments, `App.test.js` placeholder comment; customize `manifest.json`. [L2] ✅ _done — deleted the dead file + unused dep (bundle hash unchanged, proving it was dead), stripped the stray comments, and set the manifest + theme-color to the Little Lemon identity/brand green._
8. **Bump Vite / Vitest** to clear the dev-toolchain advisories; re-run the suite. [L1] ✅ _done — went to the latest: Vite 8.1 + plugin-react 6 + Vitest 4 (enabled by the `.jsx` rename in #11). `npm audit` now reports 0 vulnerabilities; 12/12 tests + build + browser smoke all green._
9. **Fix the lint-surfaced debt** and promote the 3 demoted rules back to `error`: derive time without an effect in `BookingForm` [L1]; rework `Nav` pendingScroll + modal overlay a11y alongside polish. [L3] ✅ _done — all 3 rules resolved and promoted; **lint gate is now fully clean at recommended severity, no warnings, no disables.**_
10. **Polish**: modal focus trap + focus restore + close-on-route-change; rating `aria-label`; convert `#about`/`#contact` anchors to buttons + add catch-all route; dynamic footer year. [L3]
11. **Rename JSX-bearing `.js` files to `.jsx`** (drop the esbuild loader hack) to unblock Vite 8+. [L0] ✅ _done — 14 JSX files renamed (imports are extensionless, so no import edits); `vite.config.mjs` loader hack removed; verified 12/12 tests + identical build on Vite 5. Unblocks the Vite 8 bump in #8._

---

## 4. Single highest-leverage change right now

**Introduce ESLint + a GitHub Actions CI gate (lint / test / build).** It's the deepest gap (L0), it converts the existing green tests into an actual guarantee, it makes the dead `eslint-disable` directives meaningful again, and — via `jsx-a11y` and `react-hooks/exhaustive-deps` — it will automatically flag several of the polish items instead of you hunting them. On a portfolio, "no linter, no CI" is the single loudest signal that a React project is unfinished; closing it is what most moves this from "works" to "senior."

---

## 5. Showcase readiness

**Reads as portfolio-grade already:**
- Clean component decomposition and file layout; styles colocated per component.
- Real state pattern: `useReducer` for available times + mock `fetchAPI`/`submitAPI` matching the Meta capstone spec.
- Accessible booking form: `aria-invalid`, `aria-describedby`, `role="alert"` error messaging, labeled inputs, blur-then-change validation.
- Focus-managed, Escape/overlay-dismissible contact modal; semantic HTML throughout.
- Correct `HashRouter` for GitHub Pages project pages; Vite base wired correctly (verified in built HTML).
- Good engineering hygiene in history: image optimization (35MB→1.3MB), MIT license, structured README.

**Top 3 gaps blocking showcase-grade:**
1. **No lint/CI** — the clearest "unfinished" tell for a front-end piece.
2. **Tutorial residue** — dead `reportWebVitals`, CRA-default `manifest.json`, `// Add this line` comments, README pointing at CRA's port and "Jest." Signals coursework, not craft.
3. **The core feature is under-proven and slightly wrong** — booking accepts past dates, and the tests never actually exercise submit. The one thing a reviewer will click is the weakest-covered path.

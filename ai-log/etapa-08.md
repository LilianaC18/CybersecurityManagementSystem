# Stage 8: AI log
## Tools
- Claude (Stage 8 implementation help: React Router pages, the detail page, moving the styles to CSS Modules)

## Key requests
### 1. Splitting the app into pages with React Router
- Asked: help implementing Stage 8 according to the guide: a list page, a detail page for every threat, an about page and a 404 page, with navigation that does not reload the page.
- Got: `BrowserRouter` in `main.jsx`; `App.jsx` reduced to the route map (`/`, `/amenintari/:id`, `/despre`, `*`), all nested in a route with `Layout`. `Layout.jsx` holds the header, the navigation (`NavLink` with `end` on the first link, so "Amenințări" is not active on every page), the footer and `<Outlet />`. Everything that was in `App.jsx` (state, `useEffect`, `handleAdd` / `handleToggle` / `handleDelete`) moved unchanged into `pages/AmenintariPage.jsx`, with the imports one level up.
- Changed or rejected: the detail route is `/amenintari/:id`, not `/tasks/:id`, because the automatic check builds it from `resource` in `tw.json`. The list stays on `/`. The light/dark toggle moved into `Layout`, because the header is now shared by all pages. The "Total / Active" counter moved from the header into the list panel, and the KPI panel (`ThreatStats`) stays on the list page only.

### 2. The detail page
- Asked: a page that reads the id from the URL and asks the server for exactly that threat, and that also handles an id that does not exist.
- Got: `fetchAmenintare(id)` in `api.js` and `pages/AmenintareDetaliuPage.jsx`: `useParams()` gives the id (as text), the effect depends on `[id]` so it runs again when the address changes, and it uses `ignore` against late answers. Separate states for loading (`loading`), error (`error`, with a link back) and the loaded threat (`detail`, `detail-title`).
- Changed or rejected: `request()` now also puts the HTTP status on the error (`err.status`), so for `/amenintari/999` the page says "Nu există nicio amenințare cu id-ul 999." instead of only "Eroare server: 404"; other errors (API stopped) keep the server message. The page shows more than the card: incident code, severity with its CVSS range, status, detection source, the target remediation time for that severity (24 hours for Critical ... 90 days for Low) and the database id. The top border takes the severity color. As the guide notes, `setLoading(true)` / `setError(null)` are not called at the start of the effect (the `react-hooks/set-state-in-effect` lint rule).

### 3. Moving the styles to CSS Modules
- Asked: how to split the 1000-line `App.css` so that every component has its own styles.
- Got: one `.module.css` next to every component and page (`Layout`, `ThreatCard`, `ThreatList`, `ThreatForm`, `ThreatStats`, `AmenintariPage`, `AmenintareDetaliuPage`, `DesprePage`, `NotFoundPage`), with class names written as `styles.name` in JSX. `App.css` was renamed to `index.css` and keeps only the variables, the light/dark themes and the shared classes. The severity list (values, labels, CVSS ranges, weights) moved into `src/constants.js`, used by the form, the card, the KPI panel and the detail page.
- Changed or rejected: kept my own design (red brand, KPI cards, severity stripe on cards, skeleton while loading) instead of the guide's TaskFlow styles; the navigation is a pill-shaped tab bar under the title. In `ThreatCard` the `<label>` around the title became a `div` and the checkbox got an `aria-label`, because the title is now a link; `item-title` was replaced by `item-link`, all other `data-testid` attributes from Stage 7 stayed on the same elements.

## What I learned / what did not work
- `<Link to>` changes only the address and React draws the matching page; `<a href>` would reload the whole document and lose the state.
- `useParams()` always returns text (`"3"`), so it must be converted with `Number(id)` before comparing it with numeric ids.
- Without `end`, the `NavLink` to `/` stays active on every page, because every address starts with `/`.
- With CSS Modules, `className="card"` no longer works: the class gets a unique generated name, so it must be `className={styles.card}`. A global class from `index.css` used inside a module must be wrapped in `:global(...)`.
- A missing `.module.css` file stops Vite with "Failed to resolve import".
- Refreshing on `/amenintari/1` works in development because Vite returns `index.html` for every address; a normal web server needs extra configuration (Stage 12).

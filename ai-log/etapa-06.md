# Stage 6: AI log
## Tools
- Claude (Stage 6 implementation help and review of the whole project)

## Key requests
### 1. Loading the threats from json-server with `useEffect`
- Asked: help finishing Stage 6 according to the guide: the list should come from `db.json` through `api.js`, with loading, success and error states.
- Got: `App.jsx` with `useState([])`, `loading` and `error` states, a `useEffect(..., [])` that calls `fetchAmenintari()` inside an inner `async function load()` with `try / catch / finally`, and the `ignore` cleanup; the three conditional blocks in JSX; `.info` and `.error` styles at the end of `App.css`.
- Changed or rejected: adapted the guide's names to my project (`amenintari`, `fetchAmenintari`, `/amenintari`, "Se încarcă amenințările..."); the error colour uses my existing `--badge-critical` variable instead of `--mare`, and `--error-bg` / `--error-border` were added to all three theme blocks (light, system dark, `data-theme="dark"`), so the message is readable in both themes.

### 2. The header shield image was too large
- Asked: why `shield.svg` appeared huge on the page and how to make it look better.
- Got: the `.hero-shield` rule had been written inside `@media (max-width: 700px)`, so on a wide screen the SVG had no size and was drawn at its default size. The rule was moved outside the media query (56px, next to the title, in a `.title-row` flex row); under 700px it becomes 44px and sits above the title.
- Changed or rejected: kept the animated shield; only its size and position changed.

### 3. Design additions inspired by Bitdefender GravityZone
- Asked: ideas to make the page look more like a security dashboard (Bitdefender, CrowdStrike, Microsoft Defender), without changing what the stage requires.
- Got: a new `ThreatStats.jsx` component with four KPI cards (total, active critical threats, remediated with percentage, risk score out of 100) and a severity distribution bar; a skeleton of three pulsing cards while the list loads; a fine grid and a soft red glow in the header background.
- Changed or rejected: everything is derived from the list (no new state), so the numbers update when a threat is checked or deleted; the stats are shown only after the data has loaded. I did not add search, filters or sorting and I kept the existing class names (`.panel`, `.container`, `.item-card`) for stage 7.

## What I learned / what did not work
- `fetch` does not throw on 404 or 500, only when it cannot reach the server, so `res.ok` has to be checked by hand in `api.js`.
- The function passed to `useEffect` cannot be `async`, so the request goes into an inner `load()` function; `[]` means it runs once, after the first render.
- In development React mounts the component twice (StrictMode), which is why the Network tab shows two requests to `/amenintari`; the `ignore` flag stops the first one from setting state.
- Every load has three states and each must show something on screen: loading, the list, or an error that says what to do (`npm run api`).
- A CSS rule placed by mistake inside a `@media` block only applies on that screen size; this is why the shield looked fine on the phone and huge on the laptop.
- A value computed from the data on every render (like the risk score) stays correct automatically; storing it in its own `useState` would make it go out of sync after a toggle or delete.

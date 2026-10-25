# Stage 4: AI log
## Tools
- Gemini
## Conversations
- https://share.gemini.google/OEoeom2XMFxn

## Key requests
### 1. Breaking the UI into React components and rendering incidents from data
- Asked: I requested an explanation of the Stage 4 requirements, the essential theoretical concepts, and guidance on how to adapt the components for my Cybersecurity Management System project (replacing the temporary JSON dump with dynamic incident cards)
- Got: The full folder and file structure (`IncidentCard.jsx`, `IncidentList.jsx`), the necessary theoretical background (props, `.map()` iteration, `key` attribute, conditional rendering), and tailored code examples with severity mappings and status handling
- Changed or rejected: I adapted the code and component names for my own project (`ThreatCard.jsx`, `ThreatList.jsx`, `amenintari`, `remediat`)

## What I learned / what did not work
- I learned the critical role of the `key` prop when rendering lists with `.map()`: it must be assigned directly to the top-level returned component (`<ThreatCard key={amenintare.id} amenintare={amenintare} />`) and should use a stable, unique identifier (the threat ID) rather than the array index to avoid console warnings and rendering bugs
- I understood the one-way data flow in React via props (`App` -> `ThreatList` -> `ThreatCard`) and that props are strictly read-only for child components
- What didn't work at first: Initially, rendering an empty array (`[]`) left a blank panel without user feedback; I fixed it by implementing an early return in `ThreatList` to conditionally display a helpful empty state message ("Nu există nicio amenințare înregistrată.")
# Cybersecurity Management System
A security tracking app designed for system administrators and cybersecurity analysts to monitor, prioritize, and mitigate system threats in real time. The application manages identified infrastructure vulnerabilities, enabling automated tracking of active VS remediated security incidents across network devices.

## Data model
| Field | Type | Notes |
| ----------- | ------------ | ------------------------------------ |
| threat_name | text | required, max 100 chars |
| is_resolved | boolean | toggled from the list, default false |
| severity | fixed values | Critical, High, Medium, Low |
| department | relation | Security Operations Center, Incident Response, Network Security |
| source | text | optional, where the threat was detected (e.g. Detecție EDR, Network Scan) |
| user | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. WannaCry.v2 Ransomware, active, Critical
2. SQL Injection in Auth Endpoint, done, High
3. Outdated SSL/TLS Protocol, active, Medium

## How to run (stages 1–2: static mockup)
Open `mockup/index.html` in a browser. No build step, no server.
For the React app (from stage 3), see the How to run section under Stage 3.

## AI usage
| Tool | Used for |
| -------------- | ----------------------------------------- |
| Gemini | Assistance with domain mapping (adapting the Cybersecurity Management System database project to Stage 1 & Stage 2), semantic HTML layout, CSS styling architecture, implementing immutable helper functions in plain JavaScript, fixing Vite/npm setup errors (stage 3), React components and props (stage 4), React state and the light/dark toggle (stage 5) explaining code sections that I did not fully understand. |
| Claude | Stage 5: reviewing the project, finding a Windows-only npm package that broke `npm install` on macOS/Linux, a narrow-screen layout fix, git rev-parse HEAD command which is extremely helpful, help with checking my overall project against the checklist |

Details per stage: see the ai-log/ folder.

## Verification Checklist (Stage 1)
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md#L1-L19](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/4d5d0f6c81eaf0b273ac175d1d5c49371c462b41/README.md?plain=1#L1-L19) | read |
| S1-R2 | AI usage section | [README.md#L20-L24](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/4d5d0f6c81eaf0b273ac175d1d5c49371c462b41/README.md?plain=1#L20-L24) | read |
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/4d5d0f6c81eaf0b273ac175d1d5c49371c462b41/ai-log/etapa-01.md?plain=1#L1-L18) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [mockup/index.html#L13-L95](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/6611bcce8ff4da5cc42c671d67fb6b159c802c8a/mockup/index.html#L13-L95) | open the page |
| S1-R5 | finished card looks different | [mockup/style.css#L457-L466](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/7bfd07138850c87d8888af8f22976a4a2979f2d3/mockup/style.css#L457-L466) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [mockup/style.css#L482-L491](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/7bfd07138850c87d8888af8f22976a4a2979f2d3/mockup/style.css#L482-L491) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [focus: mockup/style.css#L477-L480](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/7bfd07138850c87d8888af8f22976a4a2979f2d3/mockup/style.css#L477-L480), [dark theme: mockup/style.css#L52-L89](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/7bfd07138850c87d8888af8f22976a4a2979f2d3/mockup/style.css#L52-L89) | Tab; dark mode |

## Stage 2: data logic
Plain JavaScript, no DOM. `amenintari.js` holds the array and the functions
that read and change it. Results are printed in the browser console (F12).

## Verification Checklist (Stage 2)
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | [index.html#L101-L102](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/index.html#L101-L102) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [amenintari.js#L2-L21](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/amenintari.js#L2-L21) | read |
| S2-R3 | list, count, search, add, toggle, delete | [amenintari.js#L26-L92](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/amenintari.js#L26-L92) | console output |
| S2-R4 | add rejects empty name and invalid tag | [amenintari.js#L53-L65](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/amenintari.js#L53-L65) | last 2 console lines |
| S2-R5 | original array unchanged after add | [amenintari.js#L99-L106](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/amenintari.js#L99-L106) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md#stage-2-data-logic](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/76bdad1e0420e3b49aa730799e468c84714f664d/README.md?plain=1#L38),[ai-log/etapa-02.md](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/76bdad1e0420e3b49aa730799e468c84714f664d/ai-log/etapa-02.md?plain=1#L1) | read |
| S2-R7 | commit “Stage 2” pushed | [commit Stage 2](https://github.com/LilianaC18/CybersecurityManagementSystem/commit/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90) | commit history |


## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2
moved into the main component; the list is still printed raw.
## How to run
```
cd frontend
npm install
npm run dev
```
Then open the address printed in the terminal (http://localhost:5173).

## Verification Checklist (Stage 3)
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json#L6-L11](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/b6dcbb196a70a7a8031d927946a52c1a349b3cb8/frontend/package.json#L6-L11) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data  | [frontend/src/App.jsx#L23-L46](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/ecfd6a3d929e71196c5124d78a9fccb1aff1b54c/frontend/src/App.jsx#L23-L46) | edit data, save |
| S3-R3 | data from README, not from the example | [frontend/src/App.jsx#L1-L20](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/ecfd6a3d929e71196c5124d78a9fccb1aff1b54c/frontend/src/App.jsx#L1-L20) | compare with README |
| S3-R4 | stage 1 styles reused | [frontend/src/App.css](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/ecfd6a3d929e71196c5124d78a9fccb1aff1b54c/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore#L10-L11](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/ecfd6a3d929e71196c5124d78a9fccb1aff1b54c/frontend/.gitignore#L10-L11) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/ecfd6a3d929e71196c5124d78a9fccb1aff1b54c/README.md?plain=1#L54),[etapa-03.md](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/0a183ebf22cece44f274573a41906fa5005c638a/ai-log/etapa-03.md?plain=1) | read |
| S3-R7 | commit “Stage 3” pushed | [commit Stage 3](https://github.com/LilianaC18/CybersecurityManagementSystem/commit/ecfd6a3d929e71196c5124d78a9fccb1aff1b54c) | commit history |

## Stage 4: components
The list is rendered from the data, through two components:
- `ThreatList` receives the whole array and renders one card per item
- `ThreatCard` receives a single item through props and displays it


### Stage 4: Checklist

| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](https://github.com/LilianaC18/CybersecurityManagementSystem/tree/43a19f2fdf2de969adede245b02324bda5738b92/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [ThreatCard.jsx#L1-L54](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/baf1c4efa94a3c8bfb461c50277f45e5705162ee/frontend/src/components/ThreatCard.jsx#L1-L54) | read |
| S4-R3 | map + key={id}, no console warnings | [ThreatList.jsx#L9-L15](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/43a19f2fdf2de969adede245b02324bda5738b92/frontend/src/components/ThreatList.jsx#L9-L15) | F12, Console |
| S4-R4 | message for empty list | [ThreatList.jsx#L5-L7](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/43a19f2fdf2de969adede245b02324bda5738b92/frontend/src/components/ThreatList.jsx#L5-L7) | set array to `[]` |
| S4-R5 | state changes the card look | [ThreatCard.jsx#L11-L13](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/43a19f2fdf2de969adede245b02324bda5738b92/frontend/src/components/ThreatCard.jsx#L11-L13) | toggle `remediat` flag |
| S4-R6 | README Stage 4 section + AI log | [README.md](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/43a19f2fdf2de969adede245b02324bda5738b92/README.md?plain=1#L74),[etapa-04.md](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/43a19f2fdf2de969adede245b02324bda5738b92/ai-log/etapa-04.md?plain=1#L1) | read |
| S4-R7 | commit "Stage 4" pushed | [commit Stage 4](https://github.com/LilianaC18/CybersecurityManagementSystem/commit/6350231bbdda7866d00c1e0ae7251b7176617b19) | commit history |

## Stage 5: local state and events
The list lives in React state. Checking and deleting work from the page,
and the counters in the header follow automatically. A button in the
header switches between light and dark mode. Changes are lost on refresh,
which is what stage 6 and stage 10 fix.


### Stage 5: Checklist

| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S5-R1 | list kept in useState, in App | [App.jsx#L33](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.jsx#L33) | read |
| S5-R2 | toggling changes state and card look | [App.jsx#L36-L40](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.jsx#L36-L40), [ThreatCard.jsx#L10-L21](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/components/ThreatCard.jsx#L10-L21) | click a checkbox |
| S5-R3 | delete removes the item | [App.jsx#L42-L44](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.jsx#L42-L44), [ThreatCard.jsx#L44-L50](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/components/ThreatCard.jsx#L44-L50) | click Șterge |
| S5-R4 | header counter derived, not in state | [App.jsx#L52](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.jsx#L52), [App.jsx#L77-L80](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.jsx#L77-L80) | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx#L36-L44](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.jsx#L36-L44) | read |
| S5-R6 | light / dark toggle: state + data-theme on html | [App.jsx#L26-L34](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.jsx#L26-L34), [App.jsx#L46-L63](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.jsx#L46-L63), [App.css#L49-L124](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd/frontend/src/App.css#L49-L124) | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | [README.md#L96-L100](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/368d3629c625e0d7674008e2717fe4f08fb60362/README.md?plain=1#L96-L100), [ai-log/etapa-05.md](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/54f9cccda3a57fe2cc75de3e1e6b38c4d3a00b1a/ai-log/etapa-05.md?plain=1) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [commit Stage 5](https://github.com/LilianaC18/CybersecurityManagementSystem/commit/cd43ff9dff3cda5c2b70d2df19d4dfb3a23292fd) | commit history |

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API





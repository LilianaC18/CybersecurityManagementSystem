# Cybersecurity Management System
A security tracking app designed for system administrators and cybersecurity analysts to monitor, prioritize, and mitigate system threats in real time. The application manages identified infrastructure vulnerabilities, enabling automated tracking of active VS remediated security incidents across network devices.

## Data model
| Field | Type | Notes |
| ----------- | ------------ | ------------------------------------ |
| threat_name | text | required, max 100 chars |
| is_resolved | boolean | toggled from the list, default false |
| severity | fixed values | Critical, High, Medium, Low |
| department | relation | Security Operations Center, Incident Response, Network Security |
| user | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. WannaCry.v2 Ransomware, active, Critical
2. SQL Injection in Auth Endpoint, done, High
3. Outdated SSL/TLS Protocol, active, Medium

## How to run
Open `index.html` in a browser. No build step, no server.
## AI usage
| Tool | Used for |
| -------------- | ----------------------------------------- |
| Gemini | Assistance with domain mapping (adapting the Cybersecurity Management System database project to Stage 1 & Stage 2), semantic HTML layout, CSS styling architecture, implementing immutable helper functions in plain JavaScript, explaining code sections that I did not fully unerstand. |
Details per stage: see the ai-log/ folder.

## Verification Checklist (Stage 1)
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S1-R1 | README: description, fields, sample data, how to run | README.md | read |
| S1-R2 | AI usage section | README.md#ai-usage | read |
| S1-R3 | AI log for stage 1 | ai-log/etapa-01.md | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L65](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/4d5d0f6c81eaf0b273ac175d1d5c49371c462b41/index.html#L10-L65) | open the page |
| S1-R5 | finished card looks different | [style.css#L160-L167](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/4d5d0f6c81eaf0b273ac175d1d5c49371c462b41/style.css#L160-L167) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L181-L183](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/4d5d0f6c81eaf0b273ac175d1d5c49371c462b41/style.css#L181-L183) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L176-L196](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/4d5d0f6c81eaf0b273ac175d1d5c49371c462b41/style.css#L176-L196) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [Commit Stage 1](https://github.com/LilianaC18/CybersecurityManagementSystem/commit/4d5d0f6c81eaf0b273ac175d1d5c49371c462b41) | commit history |

## Stage 2: data logic
Plain JavaScript, no DOM. `amenintari.js` holds the array and the functions
that read and change it. Results are printed in the browser console (F12).

## Verification Checklist (Stage 2)
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load| [index.html#L101](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/index.html#L101) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [amenintari.js#L2-L21](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/amenintari.js#L2-L21) | read |
| S2-R3 | list, count, search, add, toggle, delete | [amenintari.js#L26-L92](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/amenintari.js#L26-L92) | console output |
| S2-R4 | add rejects empty name and invalid tag | [amenintari.js#L53-L65](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/amenintari.js#L53-L65) | last 2 console lines |
| S2-R5 | original array unchanged after add | [amenintari.js#L99-L106](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/d3ec0d83bece65ad83d3545e3b1a6377b1db9b90/amenintari.js#L99-L106) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md#stage-2-data-logic](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/76bdad1e0420e3b49aa730799e468c84714f664d/README.md?plain=1#L38),[ai-log/etapa-02.md](https://github.com/LilianaC18/CybersecurityManagementSystem/blob/76bdad1e0420e3b49aa730799e468c84714f664d/ai-log/etapa-02.md?plain=1#L1) | read |
| S2-R7 | commit “Stage 2” pushed | [commit “Stage 2” pushed](https://github.com/LilianaC18/CybersecurityManagementSystem/commit/7b6a50b9010956e84073f2e076467e6f933fd9e2) | commit history |


## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2
moved into the main component; the list is still printed raw.
## How to run
cd frontend
npm install
npm run dev
Then open the address printed in the terminal (http://localhost:5173).


## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [ ] Stage 3: Vite and React project



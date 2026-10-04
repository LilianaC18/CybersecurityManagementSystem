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
| Gemini | Assistance with domain mapping =adapting the Cybersecurity Management System database project to Stage 1 mockup data, structuring semantic HTML, further assistance with CSS styling |
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

## Status
- [x] Stage 1: static mockup
☐ Stage 2: data logic in JavaScript

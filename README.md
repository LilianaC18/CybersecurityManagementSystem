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
## Status
- [x] Stage 1: static mockup
☐ Stage 2: data logic in JavaScript
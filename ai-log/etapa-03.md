# Stage 3: AI log
## Tools
- Gemini
## Conversations
- https://share.gemini.google/m7okLIIuPXi3

## Key requests
### 1. Data model adaptation, component setup in React (Vite) & concept explanations
- Asked: How to resolve environment and execution errors (PSSecurityException, native Rolldown/Vite binding issues), understand core Stage 3 concepts (Node.js, npm, Vite, JSX, React components), and adapt the lab template to a custom domain dataset (amenintari for a Cybersecurity Management System)
- Got: Step-by-step PowerShell execution policy configuration and node_modules reinstallation commands. An explanation of React/Vite fundamentals and a line-by-line verification of App.jsx
- Changed or rejected: -


## What I learned / what did not work
- Initial environment setups triggered PowerShell script blocking (PSSecurityException) and native binary resolution issues (Cannot find native binding for @rolldown/binding-win32-x64-msvc), requiring Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser, clearing node_modules and package-lock.json, and running a clean npm install

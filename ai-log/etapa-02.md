# Stage 2: AI log
## Tools
- Gemini
## Conversations
- https://gemini.google.com/app/e6c2c0667b0f79fd?hl=ro (assistance with code writing for amenintari.js and additional explanations)
- https://gemini.google.com/app/5d74a973d76b8a81?hl=ro (explaining the code)

## Key requests
### 1. Data model adaptation & immutability in JavaScript
-Asked: How to adapt the Stage 2 data structures (taskuri.js from the guide) to the Cybersecurity Management System domain (amenintari.js), implementing immutable helper functions (listeazaTitluri, numaraActive, cautaDupaTitlu, nextId, adaugaAmenintare, comutaRemediat, stergeAmenintare).
-Got: Pure JavaScript functions relying on non-mutating array methods (map, filter, reduce) and object spread syntax ({ ...t, remediat: !t.remediat }) that return new references instead of mutating the source array.
-Changed or rejected: Retained the project-specific threat entity fields (id, titlu, severitate, remediat) and mapped severity strictly to cybersecurity levels (Critical, High, Medium, Low) rather than generic task priorities.
### 2. Explain JavaScript code
-Asked: Explain in detail some sections of the code that I did not fully understand.
-Got: Further explanations of the concepts
-Changed or rejected: - (added comments in my code for better understanding)

### What I learned / what did not work
Understood why array and object immutability ([...lista, nou], {...t, remediat: !t.remediat}) is essential for predictable state management, avoiding hidden side effects across modules and directly laying the foundation for React state updates in subsequent stages.
Understood why computing incremental IDs with lista.reduce((max, t) => Math.max(max, t.id), 0) + 1 prevents severe ID collision bugs that inevitably happen when relying on lista.length + 1 following item deletions (stergeAmenintare).

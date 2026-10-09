# Stage 2: AI log
## Tools
- Gemini
## Conversations
- https://gemini.google.com/app/5d74a973d76b8a81?hl=ro ()

## Key requests
### 1. Data model adaptation & immutability in JavaScript
- Asked: How to adapt the Stage 2 data structures (`taskuri.js` from the guide) to the Cybersecurity Management System domain, implementing immutable helper functions (`listeazaTitluri`, `numaraActive`, `cautaDupaTitlu`, `nextId`, `adaugaAmenintare`, `comutaRemediat`, `stergeAmenintare`).
- Got: Pure JavaScript functions relying on array methods (`map`, `filter`, `reduce`) and spread syntax (`...`) without modifying the original state.
- Changed or rejected: Kept the specific security severity levels (`Critical`, `High`, `Medium`, `Low`) and threat data model matching the project specification.

### 2. Validation and test suite setup
- Asked: How to ensure robust input validation (empty threat titles after trimming and unsupported severity tags) and display grouped console logs.
- Got: Validation conditions returning early with warnings (`console.warn`) and organized test cases covering reading, adding, toggling, deleting, and edge-case validation.
- Changed or rejected: Verified that the original array length remains unchanged after operations, validating immutability as demanded by the course guidelines.

## What I learned / what did not work
- Understood why array and object immutability (`[...lista, nou]`, `{...t, remediat: !t.remediat}`) is essential for predictable state management and how it prepares the logic for React state updates in later stages.
- Understood why computing the next ID using `reduce` with `Math.max` prevents ID collision issues that occur when using `length + 1` after deletions.
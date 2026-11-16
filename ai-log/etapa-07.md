# Stage 7: AI log
## Tools
- Claude (Stage 7 implementation help: form, validation, saving to json-server, `tw.json` and `data-testid` attributes)

## Key requests
### 1. Adding threats from a controlled form, with validation
- Asked: help implementing Stage 7 according to the guide: a form that creates new threats from the page, validates the data and shows the item in the list only after the server confirmed the save.
- Got: a new `ThreatForm.jsx` component, controlled (`value` + `onChange` on every field): `titlu` (text), `severitate` (select with Critical / High / Medium / Low) and `sursa` (optional text). `valideaza()` checks that the name is not empty, has at most 100 characters, the severity is one of the four values and the source has at most 50 characters. `handleSubmit` starts with `e.preventDefault()`, stops if validation fails (nothing is sent), disables the button while sending ("Se salvează..."), clears the fields only after `await onAdd(...)` succeeded and shows the error under the fields if it failed.
- Changed or rejected: adapted the guide's `TaskForm` to my data model (`amenintari`, `remediat`, `severitate`, `sursa`) and reused the `.item-form` styles and labels from my Stage 1 mockup ("Înregistrează alertă", the CVSS ranges in the select). Instead of `aria-invalid={Boolean(eroare)}` on the title only, `valideaza()` also returns which field is wrong, so only that field gets the red border. The source is optional (as in my README data model), so the card shows "• sursa" only when it is not empty.

### 2. Saving add, toggle and delete on the server
- Asked: how to move checking and deleting from local state to the API, so every change survives a refresh.
- Got: a common `request()` function in `api.js` (JSON header, `res.ok` check, `204` handled) and `fetchAmenintari`, `createAmenintare`, `updateAmenintare` (PATCH with only `remediat`), `deleteAmenintare`. In `App.jsx`, `handleAdd` has no `try`, so the error goes back to the form; `handleToggle` and `handleDelete` call the API first and update the state with the object returned by the server.
- Changed or rejected: the list and the KPI panel are now shown on `!loading` (not `!loading && !error`), so a failed toggle shows the error above the list without hiding it. The error text says which action failed ("Nu am putut salva modificarea", "Nu am putut șterge amenințarea") and is cleared after the next successful action.

### 3. Preparing the project for the automatic check
- Asked: which `data-testid` attributes are needed and what goes into `tw.json` for my theme.
- Got: `tw.json` in the repository root (`resource: amenintari`, `title: titlu`, `done: remediat`, `sample` with `severitate` and `sursa`), and the attributes from table 7.3: `item` (with `data-id`), `item-title`, `item-toggle`, `item-delete`, `empty`, `form`, `form-title`, `form-severitate`, `form-sursa`, `form-submit`, `form-error`, `loading`, `error`.
- Changed or rejected: the form layout went back to two columns (`1fr 2fr`), form on the left and list on the right, as in my Stage 1 mockup; under 700px the panels stay one under the other.

## What I learned / what did not work
- A controlled field needs both `value` and `onChange`; with `value` alone the input is stuck.
- A form reloads the page on submit unless `e.preventDefault()` is the first line of the handler.
- "Server first, then state": the id of a new threat comes from json-server, never from the frontend, and the list shows only what was really saved.
- Clearing the fields must happen after `await`, not in `finally`, otherwise the text is lost when the API is down ("Failed to fetch").
- Disabling the button while the request is pending stops a double click from creating two identical threats (tested with `--delay 3000`).
- `data-testid` attributes do not change how the page looks; they only let the automatic check find the form, the cards and the messages.

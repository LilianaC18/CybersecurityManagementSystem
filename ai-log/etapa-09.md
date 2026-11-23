# Stage 9: AI log
## Tools
- Claude (Stage 9 implementation help: the Express backend, server side validation, CORS and error handling, removing json-server, testing the API and the app)

## Key requests
### 1. Replacing json-server with my own Express API
- Asked: help implementing Stage 9 according to the guide and its checklist: an Express server in `backend/` with all five REST routes, validation on the server, correct HTTP codes and error handling, with the frontend working as before.
- Got: `backend/package.json` (`"type": "module"`, `start` / `dev` with `node --watch`, Express 5 and cors), `.gitignore` (`node_modules`, `.env`), `.env.example` (`PORT`, `CORS_ORIGIN`), `src/server.js` (only `app.listen`), `src/app.js` (`cors()`, `express.json()`, `/health`, the router, the 404 route and the error handler with four parameters, in this order) and `src/routes/amenintari.js` with `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` and the `gasesteIndex` helper (400 for an invalid id, 404 for a missing threat).
- Changed or rejected: the route is `/amenintari`, not `/tasks`, because `api.js` and the automatic check use the resource from `tw.json`. The in-memory array holds the five threats that were in `db.json`, so the app looks the same after the switch. The 404 message is "Amenințarea nu există". The error handler also answers 400 "Corpul cererii nu este JSON valid" for broken JSON, which is the client's fault and should not be a 500.

### 2. Validation on the server
- Asked: the same rules as the form from Stage 7, but checked on the server, since anyone can send data with curl without the form.
- Got: `valideazaAmenintare(body, { partial })` in `src/validation.js`: `titlu` required, max 100 characters; `severitate` one of `SEVERITATI` (default Medium); `remediat` boolean (default false); `sursa` optional, max 50 characters. It returns the errors and a `date` object with only the known fields (the white list), so an `id` or `user_id` sent by the client is ignored. `partial: true` for PATCH checks only the fields that were sent. `parseId` accepts only positive integers.
- Changed or rejected: `SEVERITATI` is `["Critical", "High", "Medium", "Low"]`, exactly the `value`s from `frontend/src/constants.js`; with other values the form would send severities that the server refuses. I added the `sursa` field, which the guide's TaskFlow example does not have, and a check that the body is an object (a JSON array gets 400, not an element without a title).

### 3. Connecting the frontend and removing json-server
- Asked: what has to change in React and what has to be deleted.
- Got: in `request()` from `api.js`, the error message is read from the server's `{ error }` body, with `.catch(() => ({}))` for answers without JSON; `err.status` stays, because the detail page tells 404 apart from other errors. `frontend/db.json`, the `api` script and the `json-server` dev dependency were removed, and `package-lock.json` was updated so `npm ci` will not fail.
- Changed or rejected: the detail page of a missing id now shows the server's message ("Amenințarea nu există (id 999).") instead of the text written in React. The loading error hint now says to run `npm run dev` in `backend/` instead of `npm run api`, and the About page lists Node.js and Express in the stack.

### 4. Testing
- Asked: check every requirement of the checklist before committing.
- Got: requests for every route and every error case (200, 201, 200, 200, 204, then 404 for the deleted id; 400 for an empty object, an empty title, a missing body, wrong values, an invalid id; 404 for an unknown route), the CORS headers, including the preflight for PATCH / DELETE, and a browser test of the app on the new server: add, toggle, reload, delete, reload, with no CORS errors in the console.
- Changed or rejected: I reproduced the CORS error from the guide by opening the app on `http://127.0.0.1:5173`: the page shows only "Failed to fetch", and the console shows that `Access-Control-Allow-Origin` is `http://localhost:5173`, different from the page's origin.

## What I learned / what did not work
- Different ports are different origins, so the browser blocks the answer unless the server sends `Access-Control-Allow-Origin`; it cannot be fixed from the frontend. json-server sent this header automatically.
- The order in `app.js` matters: middleware first, then routes, then the 404 route, then the error handler. Express recognizes the error handler by its four parameters, so `next` must stay in the list even if it is not used.
- Ids in the URL are text: without `parseId` (`Number`), `"3" === 3` is false and the item is "sometimes" not found.
- `req.body ?? {}`: in Express 5 a request without a body has `req.body` undefined, so it would crash before validation.
- Without `"type": "module"` in `backend/package.json`, Node refuses `import` with "Cannot use import statement outside a module".
- Data is in memory, so every restart of the server (also every save with `node --watch`) brings back the five starting threats.

# <CybersecurityManagementSystem>
< A management system designed to keep track of security threats and numerous vulnerabilities across multiple devices >
## Data model
| Field | Type | Notes |
| ----------- | ------------ | ------------------------------------ |
| <name> | text | required, max 100 chars |
| <done flag> | boolean | toggled from the list, default false |
| <fixed tag> | fixed values | <value1>, <value2>, <value3> |
| <category> | relation | <Cat1>, <Cat2>, <Cat3> |
| user | relation | the owner of the item (from week 11) |
Sample data used across all stages:
1. <item 1>, active, <tag>
2. <item 2>, done, <tag>
3. <item 3>, active, <tag>
## How to run
Open `index.html` in a browser. No build step, no server.
## AI usage
| Tool | Used for |
| -------------- | ----------------------------------------- |
| Gemini | <what exactly, e.g. CSS Grid, stage 1> |
Details per stage: see the ai-log/ folder.
## Status
- [x] Stage 1: static mockup
☐ Stage 2: data logic in JavaScript
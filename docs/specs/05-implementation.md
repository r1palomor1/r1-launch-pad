# Launch Pad R1 — Implementation Runbook

## Preflight Checklist (Gate C)
All must pass before any code generation or deployment:

- ✅ Files exist and are filled:
  - `01-constitution.md`
  - `02-specify.md` (no `NEEDS CLARIFICATION`)
  - `03-plan.md`
  - `04-tasks.md`
- ✅ `.vercelignore` excludes `/docs/` and `/rabbit-hmi-oss/`.
- ✅ App runs locally by opening `index.html` (no bundler).
- ✅ Storage helpers (`creationStorage.plain`) functional.
- ✅ All Rabbit API calls guarded with feature detection:
  - `rabbit.core.launchUrl`
  - `rabbit.core.say`
  - `rabbit.core.vibrate`
  - `rabbit.audio`
- ✅ Branch workflow set (`rebuild/vanilla-sdk` → Vercel Preview; merge to `main` only after acceptance tests).

---

## Execution Steps

### Step 1 — Development & Preview
1. Work on `rebuild/vanilla-sdk` branch.
2. After each completed task (`04-tasks.md`), commit and push:
   ```powershell
   git add .
   git commit -m "Implement <feature> using Creations SDK patterns"
   git push

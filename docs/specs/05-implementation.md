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
1. Work on the `rebuild/vanilla-sdk` branch.
2. After each completed task from `04-tasks.md`, commit and push:
   ```powershell
   git add .
   git commit -m "Implement <feature> using Creations SDK patterns"
   git push
   
### Step 1.1 — Response Format Enforcement
For every implementation step, the coding agent must:
1) **Return FULL file contents only** — no diffs, no snippets. Each response must include the complete text of any file that changes, ready to copy-paste.  
2) Append **Testing Steps** (a short, numbered checklist to validate manually in a browser) and optional **Notes** tying changes back to SDK/research.  
3) Re-scan output to ensure there are **no imports, URLs, or paths** referencing `docs/` or `rabbit-hmi-oss/` (these are **reference-only**).  
4) **Guard all device APIs** (e.g., `window.rabbit?.core?.launchUrl`) and provide safe browser fallbacks so the app runs by just opening `index.html`.  
5) Keep it **vanilla HTML/CSS/JS**, small bundle, readable comments (e.g., “// derived from SDK guidance”).

#### Required wrapper template for each file you return
Use this exact wrapper and a correct code-fence language:


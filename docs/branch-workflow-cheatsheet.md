# Git Branch Workflow — Rebuild Cheatsheet (Windows / PowerShell)
**Updated:** 2025-10-06

This guide shows the **feature branch** flow for your Rabbit R1 app rebuild, plus a quick **fallback to main** if it ever feels cumbersome.

> You can save this file anywhere. Keeping it outside your repo avoids mixing docs into the project.


---

## 0) One-time prep (optional but helpful)

```powershell
cd "C:\Users\palom\creations-sdk\creations\R1 Launch Pad"

# Make sure you're on main and tracking the remote
git checkout main
git pull
git push -u origin main    # sets upstream; future `git push` can be used without args
```


---

## 1) Start a feature branch (recommended)

```powershell
# Create and switch to your rebuild branch
git checkout -b rebuild/vanilla-sdk

# Publish the branch to GitHub and set upstream
git push -u origin rebuild/vanilla-sdk
```

**Why:** Your rebuild work stays off `main`, you get Vercel **Preview** deploys, and you can merge when ready.


---

## 2) Work on the branch with Copilot

1. Open VS Code and open these two files in tabs so Copilot can read them:
   - `docs/MASTER-PROMPT_rebuild-launch-pad-r1.md`
   - `docs/launch-pad-r1_app-analysis-EXPANDED.md`
2. In Copilot Chat, paste your kickoff message (from the MASTER PROMPT’s “Initial Tasks”).  
3. Each time Copilot returns **FULL files**, paste them into your project and test locally.

**Commit/push loop:**

```powershell
git status                  # see what's changed (optional)
git add .
git commit -m "Implement <feature> using Creations SDK patterns"
git push                    # uses upstream set earlier
```


---

## 3) Keep your branch in sync with main (only if main changes)

### Option A — Merge (simpler)
```powershell
git checkout main
git pull
git checkout rebuild/vanilla-sdk
git merge main
# Resolve conflicts in VS Code if needed:
git add .
git commit -m "Merge main into rebuild/vanilla-sdk"
git push
```

### Option B — Rebase (cleaner history)
```powershell
git fetch origin
git checkout rebuild/vanilla-sdk
git rebase origin/main
# Resolve conflicts, then:
git add .
git rebase --continue
git push --force-with-lease    # safe force-push
```


---

## 4) Test on Vercel (Preview)

Whenever you `git push` the branch, Vercel builds a **Preview**.  
Do a quick sanity check that docs aren’t deployed:

- Open the preview URL and visit `/docs/launch-pad-r1_app-analysis-EXPANDED.md`  
- Expect **404** (good). Your `.vercelignore` excludes `docs/`.


---

## 5) Finish & ship to main

When the rebuild meets your MASTER PROMPT **Acceptance Criteria**, merge to main.

### Via GitHub (preferred)
- Open a Pull Request: `rebuild/vanilla-sdk → main`
- Review, merge, and confirm Vercel’s **Production** deployment from `main`

### Via CLI
```powershell
git checkout main
git pull
git merge --no-ff rebuild/vanilla-sdk -m "Rebuild with Creations SDK patterns"
git push origin main
```

(Optional) delete the branch after merge:
```powershell
git branch -d rebuild/vanilla-sdk
git push origin --delete rebuild/vanilla-sdk
```


---

## 6) Fallback if the branch flow feels heavy (switch back to main)

You can go back to the **simple** flow at any time:

```powershell
git checkout main
git pull

# (optional) delete the feature branch locally and on GitHub
git branch -d rebuild/vanilla-sdk
git push origin --delete rebuild/vanilla-sdk
```

**Then use this everyday simple loop on main:**

```powershell
git add .
git commit -m "Your change"
git push
```

Vercel will build from `main`. The `.vercelignore` keeps `docs/` out of deploys.


---

## 7) Handy checks & tips

```powershell
git branch --show-current   # which branch am I on?
git status                  # what's changed?
git log --oneline -n 8      # last 8 commits, compact
```

**If you see “You have local changes” when switching branches:**  
- Either **commit** them first, or **stash** them temporarily:

```powershell
git add .
git commit -m "WIP: stash before switching"
# or
git stash push -m "temp work"   # stash changes
git checkout main
# later: git checkout rebuild/vanilla-sdk; git stash pop
```


---

## 8) Sanity rules for the rebuild
- `docs/` and `rabbit-hmi-oss/` are **reference-only** — never imported at runtime.  
- Ask Copilot for **FULL files only**, wrapped exactly as the MASTER PROMPT specifies.  
- Keep the bundle small; test locally by opening `index.html`.  
- If Copilot uses any old naming, remind it to **map to current SDK** (per the MASTER PROMPT).

**End of cheatsheet.**

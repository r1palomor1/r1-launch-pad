# Launch Pad R1 — Implementation Plan

## Milestones

### M1 — Scaffold & Storage
- **Goal**: Create minimal file tree (`index.html`, `styles.css`, `scripts.js`).  
- **Deliverables**: Plain UI skeleton; storage helpers (creationStorage wrappers).  
- **Exit Tests**: Links can be saved/retrieved.  
- **Vercel Preview**: App loads, 404 on `/docs/`.  
- **Risks**: Misuse of secure storage.  
- **Rollback**: Clear storage; revert to skeleton.  

### M2 — Views & Navigation
- **Goal**: Implement List/Group views; category collapse; scroll binding.  
- **Deliverables**: View toggle; collapsed state memory.  
- **Exit Tests**: Switch views persists after reload.  
- **Risks**: Scroll step tuning.  
- **Rollback**: Disable Group view.  

### M3 — Search/Add
- **Goal**: Unified input → Add or Search.  
- **Deliverables**: Intent detection, local + web search, Add flow.  
- **Exit Tests**: Add new link; search query merges results.  
- **Risks**: Network latency.  
- **Rollback**: Fallback to DuckDuckGo-only.  

### M4 — Favorites
- **Goal**: Star/unstar, Favorites dialog.  
- **Deliverables**: Star icons, quick launch dialog.  
- **Exit Tests**: Star persists; dialog shows sorted list.  
- **Risks**: Set not syncing.  
- **Rollback**: Disable dialog.  

### M5 — YouTube Search + Player
- **Goal**: Overlay search + internal player with audio-only.  
- **Deliverables**: YouTube overlay, controls, sideClick mapping.  
- **Exit Tests**: Play/pause works; audio-only hides video.  
- **Risks**: Iframe restrictions.  
- **Rollback**: Launch externally.  

### M6 — Theme System
- **Goal**: Theme editor dialog with base + modifier + live preview.  
- **Deliverables**: CSS variables, persist to storage.  
- **Exit Tests**: Theme persists after reload.  
- **Risks**: Low-contrast combos.  
- **Rollback**: Revert to defaults.  

### M7 — Delete/Bulk + Prompts
- **Goal**: Delete All, Keep Favorites, Select; confirm prompts.  
- **Deliverables**: Reusable prompt component.  
- **Exit Tests**: Deletion works with safeguards.  
- **Risks**: Accidental wipes.  
- **Rollback**: Keep-only delete.  

### M8 — QA, Accessibility, Acceptance
- **Goal**: Audit against Constitution; accessibility + safe areas.  
- **Deliverables**: Contrast checks, large tap targets.  
- **Exit Tests**: Meets Acceptance Criteria.  
- **Risks**: Device-specific regressions.  
- **Rollback**: Fix critical blockers before merge.  

---

## Branch Workflow
- Work on `rebuild/vanilla-sdk`.  
- Push → Vercel Preview.  
- Merge to `main` only at M8 after acceptance tests:contentReference[oaicite:10]{index=10}.  

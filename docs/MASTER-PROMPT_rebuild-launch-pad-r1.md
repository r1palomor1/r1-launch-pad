# MASTER PROMPT — Rebuild “Launch Pad R1” (Vanilla HTML/CSS/JS)
**Date:** 2025-10-06

This is a single hand-off for the AI coding tool. It contains:
- Project rules & constraints
- Exact reply format (full files, no partial snippets)
- Source-of-truth hierarchy
- Initial tasks, iteration, and acceptance criteria
- A comprehensive feature reference (EXPANDED) of the original app

> IMPORTANT: `docs/` and `rabbit-hmi-oss/` are **reference-only** (for humans/AI to read) and must **never** be runtime dependencies.

---

## Project Context (short)
We’re rebuilding a working app to follow **Rabbit Creations** patterns correctly. Tech is **vanilla HTML/CSS/JS** (no frameworks, no bundlers). Deploys through **GitHub → Vercel** to a **Rabbit R1** device with small storage. The final app must be small and has **no runtime dependency** on local reference folders.

---

## Hard Constraints — Do Not Violate
- **Vanilla only**: plain `index.html`, `styles.css`, `scripts.js` (+ small `js/`, `css/`, `assets/` if needed). No React/Vue/bundlers.
- **Reference-only folders** (not runtime):
  - `docs/` → research & analysis (including this prompt)
  - `rabbit-hmi-oss/` → local clones: `creations-sdk/`, `community-wiki/`, `firmware/`
- **Never import/require/fetch/copy at build** from `docs/` or `rabbit-hmi-oss/`.
- If you need information from references, **bake it into runtime files** under the app code.
- Keep output **small**: no heavy libraries unless strictly necessary.
- The app must run by simply opening `index.html` in a browser.

---

## Syntax & Mapping Policy (critical)
- Any code-like names in this prompt or the analysis (APIs, functions, storage keys) reflect the **original app** and are **placeholders**.  
- Before coding, **map** these placeholders to the **current names and patterns** in `rabbit-hmi-oss/creations-sdk` and related docs.  
- If the SDK/docs use different naming or flows, **use the SDK/docs**, and **refactor** accordingly.  
- In your **Notes** after each change, indicate what SDK guidance you used and any mapping you applied (e.g., “Original: X → SDK: Y”).

---

## Source-of-Truth Hierarchy (use in this order)
1. `rabbit-hmi-oss/creations-sdk/*`  ← most authoritative
2. `docs/*` (my curated research & analysis)
3. `rabbit-hmi-oss/community-wiki/*`
4. `rabbit-hmi-oss/firmware/*` (architecture/capabilities only as needed)
5. Only if not covered above: your internal model knowledge (last resort)

---

## Required Reply Format (full files only)
When you change or add files, **always** return the **full file content** for each file.

For each file, use exactly this wrapper:
```
=== FILE: <relative/path/from/project-root> ===
```html
<!-- full file content here -->
```
```
(Use the correct code fence language: `html`, `css`, or `javascript`.)

After all files in the response, include:
- **Testing Steps:** A short, numbered checklist I can follow in a browser to validate.
- **Notes:** (optional) brief explanation tying the change to the SDK/research (no path links; say “derived from internal research / SDK guidance”).

> Do **not** send partial snippets/diffs. Always return the entire file(s).

---

## Initial Tasks
1. Propose a **minimal file tree** for vanilla (e.g., `index.html`, `styles.css`, `scripts.js`, plus optional `assets/`, `js/`, `css/`).  
2. Identify which original features will be implemented using Rabbit Creations SDK patterns (e.g., YouTube internal player, launchUrl, scroll-first UI, TTS/haptics, theme engine).  
3. Implement step-by-step. For each step, return **full files** + **Testing Steps**.

---

## Quality Gates (enforce before you show files)
- Search your output to ensure **no references** to `docs/` or `rabbit-hmi-oss/` in imports, URLs, fetches, or paths.
- The app runs locally by opening `index.html`.
- Code is readable with brief comments (e.g., `// derived from SDK patterns`).

---

## Iteration
- I will provide feedback in plain English.
- You will update files by sending **full file contents** (no snippets) and **Testing Steps** each time.

---

## Acceptance Criteria
- The rebuild replicates original behavior but aligns with **Rabbit Creations** patterns from clones/docs.
- No runtime dependency on `docs/` or `rabbit-hmi-oss/`.
- The final bundle is lean and deployable to Rabbit R1 via Vercel.

---

# Comprehensive Feature Reference (EXPANDED)
(Use this as guidance only; do not import it at runtime.)


# Launch Pad R1 — Original App Analysis & Rebuild Guide (EXPANDED)
**Date:** 2025-10-06

> **Guidance banner:** Any code-like names in this document (APIs, functions, keys) are descriptive of the **original app** and serve as placeholders. For the rebuild, align naming, APIs, and patterns to the **latest** `rabbit-hmi-oss/creations-sdk` and supporting docs. If there is any mismatch, prefer the SDK/docs and refactor accordingly. **Do not import** from `docs/` or `rabbit-hmi-oss/` at runtime.

---

## High-Level Summary
Launch Pad R1 is a small, scroll-first launcher for Rabbit R1. It manages a personal list of links, lets you star favorites, provides a combined Search/Add input, and handles YouTube both internally (overlay player with play/pause, stop, **audio-only**) and externally. It integrates with Rabbit APIs (launch URL, TTS, haptics; sideClick/scroll events) and includes a Theme Editor with **built‑in base colors** and **~10–15 modifiers**, with **live preview** and **Light/Dark** before saving.

### Key Bullets
- **Link manager**: Add, edit, delete; group by category; persist in localStorage.
- **Favorites**: Star links; Favorites dialog for quick launch.
- **Search or Add**: One input to search the web or create a new link from text/URL.
- **Two views**: **List** and **Group**; category collapse/expand; collapse‑all.
- **YouTube**: Internal Player overlay (play/pause, stop, audio‑only) + YouTube Search overlay; or open externally.
- **Rabbit integration**: `launchUrl`, `say`, `vibrate`; **sideClick** and **scrollUp/scrollDown**.
- **Theme editor**: Base colors + ~10–15 modifiers, **live preview**, **Light/Dark** toggle, persisted.
- **Delete/bulk actions**: Delete All / Keep Favorites / Select.
- **Prompts & accessibility**: Reusable confirm/alert; safe-area and small-screen friendly.
- **Manifest/permissions**: Entry and capabilities defined in `creation.json`.

---

## High-Level Details by Feature (one‑liners)
- **Link Storage & Data Model**: Links {{id, description, url, category}} + favorite ids; normalized URLs; migration of older favorites; persistent view/collapsed state.
- **Views & Navigation**: List vs Group (A→Z categories, `Other` last); collapse‑all; hardware scroll events for fluent list navigation.
- **Search / Add Flow**: Single input; detect URL/domain vs free text; prefill Add form; otherwise search; merge local matches & web results.
- **Favorites**: Star toggle per link; Favorites dialog lists starred items A→Z for quick launch.
- **YouTube Handling**: Detect YouTube; internal player overlay with controls and audio‑only; YouTube Search overlay; sideClick toggles playback.
- **Launching URLs & Device Integration**: Guarded Rabbit API calls with fallbacks; short TTS & subtle haptics; sideClick/scroll mapped to UI.
- **Theme System**: Base colors + modifiers → palette variables; **live preview**; Light/Dark; persisted selection & mode.
- **Delete All / Bulk Delete**: Modes: All / Keep Favorites / Select; confirmation flow.
- **Prompts & Accessibility**: Reusable prompt component; safe-area aware; readable contrast; large tap targets.
- **Permissions / Manifest**: Entry + necessary Rabbit capabilities declared; verify names against latest SDK.

---

## Link Storage & Data Model

### High level (what the user sees)
- A list of saved links with descriptions and categories. Favorites show with a star. The app “remembers” your view mode (List/Group) and which categories were collapsed when you return.

### Key bullets to add
- **Persistent state**: Links, favorites, view, collapsed categories, and theme settings are stored in localStorage.
- **URL normalization**: Missing protocol → auto‑add `https://`.
- **IDs & migration**: Items without an id are assigned one; older favorites formats are migrated to a Set of ids.

### Detailed (how it works)
- **Data shape**: `links: Array<{{ id, description, url, category }}>` in memory and localStorage. Favorites as a `Set<string>` of link ids.  
- **Initialization**: On load, read from storage, generate ids if missing, normalize URLs, and restore `view` and `collapsedCategories`.  
- **Mutations**: Add/edit/delete update the in‑memory array and then write to storage; favorite toggles update the Set; UI re-renders accordingly.  
- **Sorting**: Inside categories: by description; categories A→Z with `Other` last.  
- **Resilience**: Guard against malformed URLs; trim inputs; deduplicate by `url` when appropriate.

### Layout / blueprint (feature portion)
- **Storage keys**: `launchPadR1Links`, `launchPadR1FavoriteLinkIds`, `launchPadR1View`, `launchPadR1CollapsedCategories`, `launchPadR1Theme`, `launchPadR1CustomTheme`, `launchPadR1LuminanceMode`.  
- **Core functions (conceptual)**: `loadState()`, `saveLinks()`, `saveFavorites()`, `migrateLegacyFavorites()`, `normalizeUrl()`.
- **UI**: Link list renderer; category section renderer; star toggle; edit/delete controls (if exposed).

---

## Views & Navigation

### High level (what the user sees)
- A toggle between **List** and **Group** views. Group view shows category headers with collapse/expand. A **Collapse All / Expand All** action is available. Scrolling with the hardware dial moves the list smoothly.

### Key bullets to add
- **View memory**: The chosen view persists across sessions.
- **Category order**: A→Z; `Other` last.
- **Hardware scroll**: `scrollUp/scrollDown` adjust the active list/dialog scroll position by tuned increments.

### Detailed (how it works)
- Switching views triggers the appropriate renderer. In Group view, each category has its own collapsed state persisted.  
- A global collapse‑all toggles all categories and saves the resulting map.  
- **Hardware integration**: Custom events (e.g., `scrollUp/scrollDown`) adjust `scrollTop` by step sizes chosen for small screens, ensuring predictable movement.  
- **Empty states**: When a category is empty or all links are deleted, show a simple placeholder to avoid dead space.

### Layout / blueprint (feature portion)
- **State keys**: `launchPadR1View`, `launchPadR1CollapsedCategories`.  
- **Core functions (conceptual)**: `renderListView()`, `renderGroupView()`, `toggleCollapse(category)`, `collapseAll(flag)`, `bindHardwareScroll(container)`.
- **UI**: View toggle control; category headers; collapse arrow/label; optional favorite indicator on headers.

---

## Search / Add Flow

### High level (what the user sees)
- A single **“Search or Add…”** box. Type a URL/domain to prefill an Add form, or type a query to search the web. Local matches can appear alongside web results.

### Key bullets to add
- **Intent detection**: Simple heuristics to tell **Add** (URL/domain) vs **Search** (free text).  
- **Search provider**: DuckDuckGo in browser; on device, a plugin flow (e.g., via `PluginMessageHandler` + SerpAPI) for richer results.  
- **Combine results**: Show local matches + web results without duplication.  
- **Controls**: **Clear** and **Cancel** to exit search quickly.

### Detailed (how it works)
- **Add path**: Parse input → derive description (from hostname or text), `normalizeUrl()` → show confirm/add UI → save to links.  
- **Search path**: In browser, open DuckDuckGo; on device, post message to plugin, then render returned results.  
- **Dedup & highlight**: Avoid listing the same link twice; highlight query matches in results.  
- **Error handling**: Handle timeouts/failures gracefully with an inline notice; allow retry.

### Layout / blueprint (feature portion)
- **Core functions (conceptual)**: `onSearchSubmit()`, `maybeCreateLinkFromInput()`, `renderSearchResults(localMatches, webResults)`.  
- **UI**: Search bar; buttons for Submit, Clear, Cancel; results list with sections (Local, Web).  
- **Device**: Message bridge for plugin queries; ignore stale responses if input changed.

---

## Favorites

### High level (what the user sees)
- Star/unstar links inline. A **Favorites** dialog lists starred links for quick launch or removal from favorites.

### Key bullets to add
- **Persistent Set**: Keep favorites as a Set of link ids; easy membership checks.  
- **A→Z**: Sort starred links by description for the dialog.  
- **Empty state**: Teach the user how to star items if none exist.

### Detailed (how it works)
- Clicking the star toggles membership in the Set; `saveFavorites()` persists the ids.  
- The dialog filters the links array by membership in the Set and renders tap‑to‑launch buttons.  
- Removing from favorites in the dialog updates the Set immediately and re-renders.

### Layout / blueprint (feature portion)
- **Key**: `launchPadR1FavoriteLinkIds`.  
- **Core functions (conceptual)**: `toggleFavorite(id)`, `isFavorite(id)`, `renderFavoritesDialog()`.  
- **UI**: Star icons; a dialog with list of starred links; quick launch and remove actions.

---

## YouTube Handling

### High level (what the user sees)
- YouTube links are handled specially. Users can **search YouTube** in an overlay and **play videos internally** in an overlay player with **Play/Pause**, **Stop**, and **Audio‑Only** controls; or choose to open externally.

### Key bullets to add
- **Detection**: `youtube.com` and `youtu.be` patterns.  
- **Internal player**: Overlay with a shielded iframe area; **sideClick** toggles Play/Pause.  
- **YouTube search overlay**: Enter query → result cards → tap to play internally.  
- **Audio‑Only**: CSS class hides video surface while audio continues.

### Detailed (how it works)
- **Open choice**: When a link is YouTube, prompt internal vs external (or default to internal search overlay for discovery).  
- **Player overlay**: Use the Iframe API or a basic iframe; custom controls are wired to player state; **sideClick** bound to Play/Pause when overlay is active.  
- **Search overlay**: Debounced query; plugin message to fetch results on device; results list with titles/thumbnails; tap → open internal player.  
- **Safety**: A “click shield” prevents taps from navigating out of the app; **Back** closes overlay and restores scroll focus.

### Layout / blueprint (feature portion)
- **Core functions (conceptual)**: `openYouTubeSearchOverlay()`, `renderYouTubeResults()`, `openYouTubePlayer()`, `togglePlayPause()`, `stopPlayback()`, `toggleAudioOnly()`.  
- **UI**: Two overlays (Search, Player) with clear **Cancel/Back**.  
- **Hardware**: Bind `sideClick` to play/pause only while the player overlay is present.

---

## Launching URLs & Device Integration

### High level (what the user sees)
- Tapping a card opens a link. On device, URLs open via Rabbit; in a desktop browser, they open normally. Short TTS and subtle vibration confirm actions.

### Key bullets to add
- **Feature detection**: Guarded Rabbit calls; browser fallback.  
- **Light feedback**: TTS message kept short; vibration small and quick.  
- **Event map**: `scrollUp/scrollDown` scroll lists; `sideClick` controls player.

### Detailed (how it works)
- **launchUrl**: When `rabbit.core.launchUrl` exists, call with the target URL; otherwise set `location.href`.  
- **say/vibrate**: `rabbit.core.say` and `rabbit.core.vibrate` wrapped with guards; possibly throttled to avoid spam.  
- **Safety**: Try/catch around device calls; ignore if permission not granted; no crashes in browser.

### Layout / blueprint (feature portion)
- **Core functions (conceptual)**: `launchExternal(url)`, `speak(text)`, `hapticTap()`, `bindHardwareEvents()`.  
- **Guards**: `if (window.rabbit && rabbit.core && rabbit.core.launchUrl) ...`  
- **UI**: Minimal—effects are perceptible but not intrusive.

---

## Theme System

### High level (what the user sees)
- A **Theme** dialog lets users pick from **built‑in base colors** and **~10–15 modifiers** (Vibrant, Muted, Cool, Warm, Pastel, Bold, Neon, Glow, Vintage, Metallic, Monochrome, Invert, Darker, Lighter). Users see a **live preview** and can toggle **Light/Dark** before saving.

### Key bullets to add
- Base + modifier generate a palette; live preview; Light/Dark persisted.
- Contrast safeguards; CSS variables for palette; reset to defaults.
- Storage of `{{ base, modifier, mode }}` in localStorage.

### Detailed (how it works)
- Modifiers apply H/S/L deltas to a base color → role‑based palette variables; preview is dialog‑scoped until saved.  
- Switching **Light/Dark** re-applies the preview theme.  
- On **OK**, write to storage and apply globally; on **Reset**, clear custom keys and revert.  
- Fallback to safe defaults if invalid/low‑contrast.

### Layout / blueprint (feature portion)
- **UI**: Theme button → Theme dialog; Base color list; **Lab** toggle (modifiers); **Light/Dark**; **OK**, **Reset**, **Cancel**.  
- **Core functions (conceptual)**: `updateStudioPreview()`, `applyTheme()`, `saveTheme()`, `resetTheme()`.  
- **Data**: `launchPadR1Theme`, `launchPadR1CustomTheme`, `launchPadR1LuminanceMode`.

---

## Delete All / Bulk Delete

### High level (what the user sees)
- A **Delete** dialog provides three modes: **All**, **Keep Favorites**, or **Select**. A confirm step prevents accidental mass deletion.

### Key bullets to add
- Keep Favorites preserves starred items.  
- Select mode shows checkboxes (favorites highlighted).  
- Post‑delete TTS confirms how many items were removed.

### Detailed (how it works)
- Build a candidate deletion set based on the chosen mode. On confirm, filter the links array, update favorites, persist, and re-render.  
- For **Select**, gather checked ids; ensure favorites remain when “Keep Favorites”.  
- Provide an inline summary (“Deleting N links”); require explicit confirm/OK.

### Layout / blueprint (feature portion)
- **Core functions (conceptual)**: `openDeleteDialog(mode)`, `commitDelete(selection)`.  
- **UI**: Radio options for mode; checkbox list for Select; confirm button; cancel button.  
- **Feedback**: Short TTS and haptic tap on success.

---

## Generic Prompts & Accessibility

### High level (what the user sees)
- Reusable alert/confirm prompt windows; small, readable, and safe-area aware.

### Key bullets to add
- Focus trapped inside dialog; escape routes visible.  
- Large tap targets; minimal motion; adequate contrast.  
- Safe-area padding for small screens.

### Detailed (how it works)
- A generic `showPrompt()` factory renders message + actions; returns a Promise that resolves on user action.  
- The prompt container is scrollable; hardware `scrollUp/scrollDown` moves the content.  
- ARIA attributes & labels improve screen reader output (where supported).

### Layout / blueprint (feature portion)
- **Core functions (conceptual)**: `showPrompt({{ message, buttons }})`.  
- **UI**: Overlay container, title/message, buttons area.  
- **Styling**: z-index above other overlays; backdrop; focus styles.

---

## Permissions / Manifest

### High level (what the user sees)
- No UI; defines entry point and allowed capabilities for device integration.

### Key bullets to add
- Entry (e.g., `index.html`).  
- Permissions (verify against current SDK): core:launch-url, core:say, core:haptics, core:serpapi, vibrate, tts, plainStorage, secureStorage.

### Detailed (how it works)
- `creation.json` declares name/version/entry and permission list.  
- The app should check for capability existence at runtime and fail gracefully if absent.

### Layout / blueprint (feature portion)
- **File**: `creation.json`.  
- **Checklist**: Cross-check permission names before final build; request only what’s needed.

---

## Appendix: Extracted Signals (from original sources)
- **localStorage keys (~9)**: launchPadR1CollapsedCategories, launchPadR1CustomTheme, launchPadR1FavoriteLinkId, launchPadR1FavoriteLinkIds, launchPadR1FavoriteLinkIndex, launchPadR1Links, launchPadR1LuminanceMode, launchPadR1Theme, launchPadR1View  
- **Permissions (declared)**: core:launch-url, core:say, core:haptics, core:serpapi, vibrate, tts, plainStorage, secureStorage  

**End of document.**

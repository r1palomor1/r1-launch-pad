# Launch Pad R1 — Specification

## Overview
Scroll-first Rabbit R1 launcher for managing links, favorites, YouTube, search/add, and themes.  
All interactions mapped to **Creations SDK APIs**.  

---

## Features

### Link Manager
- **UX**: List of links with description + category. Favorites show a star.  
- **Logic**: Links stored in `creationStorage.plain` (`launchPadR1Links`). Normalize URLs on save. Migrate old entries.  
- **Data**: `{ id, description, url, category }`. Favorites: `Set<string>` (`launchPadR1FavoriteLinkIds`).  
- **Events**: Add/edit/delete actions re-render list.  
- **UI States**: Empty list placeholder.  

### Views & Navigation
- **UX**: Toggle between **List** and **Group by category**. Group view supports collapse/expand and Collapse-All.  
- **Logic**: Persist `launchPadR1View` + `launchPadR1CollapsedCategories`.  
- **Events**: `scrollUp/scrollDown` adjust list position:contentReference[oaicite:7]{index=7}.  
- **UI States**: Empty categories show placeholders.  

### Search/Add Flow
- **UX**: One input: if URL → prefill add form; if text → search. Local matches shown alongside web results.  
- **Logic**: Heuristics for URL vs free text. For search: browser → DuckDuckGo; device → `PluginMessageHandler.postMessage`.  
- **Data**: Store new links in `launchPadR1Links`.  
- **Events**: Submit, Clear, Cancel.  
- **UI States**: Inline error if network fails.  

### Favorites
- **UX**: Star toggle inline. Favorites dialog lists A→Z quick-launch items.  
- **Logic**: Favorites persisted in `launchPadR1FavoriteLinkIds`.  
- **Events**: Tapping star updates Set. Removing inside dialog updates live.  
- **UI States**: Empty → hint to star items.  

### YouTube Integration
- **UX**: Special handling for `youtube.com` / `youtu.be`.  
- **Logic**: Option to play in **internal overlay player** with Play/Pause, Stop, Audio-only; or open externally.  
- **Data**: Not persisted; temporary session state.  
- **Events**: `sideClick` toggles play/pause when overlay active:contentReference[oaicite:8]{index=8}.  
- **UI States**: Back/Cancel closes overlay; error state if video fails.  

### URL Launch & Device Integration
- **UX**: Tapping card launches URL. Device gives subtle TTS + vibration.  
- **Logic**: Use `rabbit.core.launchUrl`, `rabbit.core.say`, `rabbit.core.vibrate` (guarded). Browser fallback: `window.location.href`.  
- **Events**: Hardware: `scrollUp/scrollDown` to scroll lists; `sideClick` in player.  

### Theme Editor
- **UX**: Dialog to pick base + modifier (10–15), live preview, Light/Dark toggle.  
- **Logic**: Apply as CSS variables. Persist `launchPadR1Theme`, `launchPadR1CustomTheme`, `launchPadR1LuminanceMode`.  
- **UI States**: Reset → safe defaults; safeguard low contrast.  

### Delete / Bulk Actions
- **UX**: Options: Delete All, Keep Favorites, Select.  
- **Logic**: Confirmation prompt, update `launchPadR1Links`.  
- **UI States**: Confirmation, empty states.  

### Prompts & Accessibility
- **UX**: Reusable confirm/alert. Safe-area aware.  
- **Logic**: Scroll-first UI, no grids.  
- **UI States**: Large tap targets, contrast-friendly:contentReference[oaicite:9]{index=9}.  

---

## Non-Functional
- **Performance**: Small bundle, fast load.  
- **Accessibility**: High contrast, safe-area insets (`--rabbit-safe-area-inset-*`).  
- **Resilience**: All SDK calls guarded.  
- **Persistence**: Plain storage for state, secure storage only if required.  

# Launch Pad R1 — Constitution

## Syntax & Mapping Policy
- All identifiers from the original app are placeholders.  
- Must be **mapped to the current Rabbit Creations SDK** (`window.rabbit.core`, `window.rabbit.audio`, `window.creationStorage`, `PluginMessageHandler`, etc.):contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}.  
- No runtime dependency on `docs/` or `rabbit-hmi-oss/`.  
- Store state with `window.creationStorage.plain` (non-sensitive) or `.secure` (Base64-encoded if used):contentReference[oaicite:2]{index=2}.  
- Guard all Rabbit APIs: check existence before invoking; provide browser fallback.  

## Project Purpose
Rebuild Launch Pad R1 as a **vanilla HTML/CSS/JS** launcher app for the Rabbit R1 device.  
It is scroll-first, lean, and safe-area aware. It manages user links, integrates with Rabbit device APIs, and deploys through GitHub → Vercel → Rabbit R1.  

## Goals
- **Small bundle** (vanilla only, no frameworks).  
- **Two views** (List & Group).  
- **Favorites** with quick launch.  
- **Search/Add flow** with local + web results.  
- **YouTube** support: search & internal overlay player (play/pause, stop, audio-only).  
- **Rabbit integration**: launchUrl, TTS, vibration, hardware events.  
- **Theme editor** with base + modifiers, live preview, Light/Dark.  
- **Delete/Bulk actions** with safe prompts.  
- **Accessibility**: high contrast, safe areas, large tap targets.  

## Non-Goals
- No runtime imports from research (`docs/`, `rabbit-hmi-oss/`).  
- No frameworks, bundlers, or heavy third-party libraries.  
- No persistent server component (thin-client model).  

## Deployment Surfaces
- **Preview**: feature branches → Vercel Preview.  
- **Production**: `main` branch → Vercel → Rabbit R1.  

## Success Metrics
- App opens instantly on device.  
- Scroll & side button interactions reliable.  
- Favorites, search, and YouTube flows functional offline/online.  
- All settings (links, favorites, theme, view mode) persist across sessions.  
- Accessible on small 2.88" display with safe-area support.  

## Risks & Assumptions
- **Latency**: all LLM/LAM calls are cloud-based → must handle async gracefully:contentReference[oaicite:3]{index=3}:contentReference[oaicite:4]{index=4}.  
- **SDK gaps**: secure storage quality undocumented → treat as obfuscation only.  
- **Hardware overrides**: scroll wheel volume & multi-press side button reserved by OS:contentReference[oaicite:5]{index=5}:contentReference[oaicite:6]{index=6}.  
- **Assumption**: `launchUrl`, `say`, `vibrate`, `audio`, `creationStorage` are stable.  

## Source-of-Truth Hierarchy
1. `rabbit-hmi-oss/creations-sdk`  
2. `docs/` (research & analysis)  
3. `rabbit-hmi-oss/community-wiki`  
4. `rabbit-hmi-oss/firmware`  
5. Internal knowledge (fallback)  

## Acceptance Criteria
- Runs locally by opening `index.html`.  
- Passes quality gates: no forbidden imports, lean code, accessible UI.  
- Fully functional on Rabbit R1 with preview → production workflow.  

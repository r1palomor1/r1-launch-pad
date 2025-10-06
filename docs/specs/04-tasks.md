# Launch Pad R1 — Task Breakdown

| ID  | Task | Feature | Priority | Depends On | Estimate | Acceptance Test |
|-----|------|---------|----------|------------|----------|-----------------|
| T01 | Scaffold vanilla file tree | Infrastructure | High | — | 0.5d | index.html opens locally |
| T02 | Implement creationStorage wrappers (plain/secure) | Infrastructure | High | T01 | 0.5d | Save/retrieve JSON object |
| T03 | Build List view renderer | Link Manager | High | T02 | 1d | Links render from storage |
| T04 | Build Group view + collapse/expand | Views | High | T03 | 1d | Grouped categories collapse |
| T05 | Bind scrollUp/scrollDown to list container | Navigation | High | T04 | 0.5d | Hardware scroll moves list |
| T06 | Implement Search/Add input with intent detection | Search/Add | High | T03 | 1d | URL → Add flow, text → search |
| T07 | Integrate web search via PluginMessageHandler | Search/Add | Medium | T06 | 1d | Remote results merge with local |
| T08 | Add Favorites toggle + dialog | Favorites | High | T03 | 1d | Star persists; dialog shows items |
| T09 | Implement YouTube detection & overlay player | YouTube | High | T03 | 2d | Play/pause/stop/audio-only work |
| T10 | Map sideClick to play/pause when overlay active | YouTube | Medium | T09 | 0.5d | Side button toggles playback |
| T11 | Implement theme editor (base + modifiers + Light/Dark) | Theme | Medium | T03 | 2d | Theme saves & applies on reload |
| T12 | Add Delete All / Keep Favorites / Select modes | Bulk/Delete | Medium | T03 | 1d | Deletion works with prompt |
| T13 | Build reusable prompt/alert component | Prompts | Medium | T12 | 0.5d | Prompt displays before delete |
| T14 | Add TTS + vibration feedback on launchUrl | Device Integration | Medium | T03 | 0.5d | Link launches with feedback |
| T15 | QA: Accessibility audit (contrast, safe-area) | QA | High | All | 1d | App passes accessibility checks |
| T16 | Preview checks on Vercel (no docs deployed) | Infrastructure | High | All | 0.5d | `/docs/` returns 404 |
| T17 | Merge to main after acceptance tests | Release | High | All | 0.5d | Vercel production deploy passes |

---

## Notes
- All Rabbit SDK calls must be guarded with `if (window.rabbit && rabbit.core)` checks:contentReference[oaicite:11]{index=11}:contentReference[oaicite:12]{index=12}.  
- `.vercelignore` ensures `docs/` excluded from deploy.  
- Each task atomic; commit separately; follow branch workflow.  

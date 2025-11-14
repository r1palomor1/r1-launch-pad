
Purpose: This Markdown document is the canonical reference that AI coding platforms and integrators must consult when generating, reviewing, or modifying code for the Rabbit R1 Creations environment. It contains authoritative SDK URLs, a concise technical summary of the R1 Agenda app local storage implementation, and a constitution rule that must be followed when returning code blocks or patch-style fixes.


---

SDK & Reference URLs

https://www.npmjs.com/package/r1-create

https://gist.github.com/DavidBuchanan314/aafce6ba7fc49b19206bd2ad357e47fa

https://nodejs.org/dist/v8.9.4/docs/api/

https://github.com/AidanTheBandit/R1-create.js

https://raw.githubusercontent.com/rabbit-hmi-oss/creations-sdk/refs/heads/main/plugin-demo/reference/creation-triggers.md

https://github.com/rabbit-hmi-oss/creations-sdk/blob/main/plugin-demo%2Freference%2Fcreation-triggers.md


> Usage note: AI systems should prefer the official repository and raw content URLs for definitive behavior and examples. If multiple sources conflict, prioritize the official rabbit-hmi-oss/creations-sdk repository and the r1-create npm package documentation.




---

Technical summary — Local Storage Implementation (R1 Agenda app)

The R1 Agenda app implements a sophisticated multi-tiered local storage strategy that prioritizes R1's native CreationStorageHandler as the primary storage mechanism, with intelligent fallbacks to IndexedDB and localStorage for maximum reliability. The system uses Base64 encoding when storing data through R1.creationStorage.plain.setItem() while maintaining parallel storage across all available methods to ensure data persistence even if one storage mechanism fails. The implementation includes automatic data synchronization between storage layers, periodic auto-save every 30 seconds, and event-driven saves triggered by page visibility changes and beforeunload events. The app also features comprehensive error handling with graceful degradation: if R1 storage fails, it automatically falls back to IndexedDB, and if that fails, it uses localStorage as a final fallback—ensuring users never lose their agenda data regardless of the storage environment.


---

Constitution Rule for AI platforms (MANDATORY)

> Constitution Rule — Strict adherence required when returning code or patch-style fixes:



No Verbosity/Debugging: Do not provide any verbosity information, debugging code, or syntax to display unless requested. All work is done in the background.
Two Windows for Fixes: Fixes must use two windows: Before (truncated block context: top 5 lines, truncation, last 5 lines) and After (full complete modified block).
Code Only: Both windows must contain only the existing code from the files, with no assumptions, generic, or ghost code to be included, ever.
Sequential Stages: All work must be done in sequential, individual stages and steps (e.g., Stage 1.1, then 1.2, etc.).
Cohesive Updates: Each step must represent one individual, cohesive update. Provide the code before/after step update. Then add a sentence at end to indicate: Ready for next Stage.Step description. For example "Ready for Stage 2.3 modify row heights for font adjustments"

Important enforcement note: When asked to provide code changes, AI must format each fix as a stage-based response that contains only the requested two-window code blocks (Before/After) exactly as specified. No extra explanation, no added code, and no debugging output unless the user explicitly requests it.


---

Recommended referencing policy for AI integrators

1. Always include this Markdown file as the first referenced document when generating or validating R1-specific code.


2. When uncertain about API details, consult the raw GitHub raw.githubusercontent.com URL(s) included above for up-to-date content.


3. When producing fixes or diffs for the user's codebase, strictly follow the Constitution Rule above.


GitHub Copilot Instructions for R1 Launch Pad Project
This file provides context and guidelines for GitHub Copilot to better assist with code suggestions and generation related to the "R1 Launch Pad" application development under the "creations-sdk" project.

Project Structure and Repositories
The project root folder is:

C:\Users\palom\creations-sdk\creations\R1 Launch Pad

There are three important cloned GitHub repositories nested here, which serve as the core codebases and reference sources:

creations-sdk at rabbit-hmi-oss/creations-sdk

community-wiki at rabbit-hmi-oss/community-wiki

firmware at rabbit-hmi-oss/firmware

These repositories include multiple subfolders and files which are part of the development environment.

Important Documentation
There are three detailed markdown research documents with deep analysis and ChatGPT-based commentary relevant to this project:

docs/rabbit-creations-deep-research.md

docs/rabbit-creations-chatgpt-analysis.md

docs/R1_App_Framework.md (app framework analysis based on audio transcript cleaned-up to detail current app architecture and functionality; serves as a key development guide)

These documents contain important insights, SDK guidelines, coding practices, and architectural notes.

Guidelines for GitHub Copilot
When generating or suggesting code, Copilot should:

Prioritize content and conventions from the cloned repositories listed above and their subfolders.

Reference and respect the rules, coding guidelines, SDK usage, and architectural insights contained within the three research markdown files.

Lean on the official GitHub repos for implementation details, API usage, and file structure.

When native instructions or SDK-specific syntax are unclear or missing, default to standard, commonly accepted programming syntax and best coding practices.

Avoid generating code that diverges from the coding style or architecture evident in the repos and research files.

Use the URLs to the GitHub repos as canonical references for repository context and integration points.

Critically, the cloned repos, docs folder, and GitHub repo resources should serve only as development guides and references — NOT as runtime dependencies of the app.

Code generated should integrate functionality fully within the app itself, avoiding any reliance on local paths or direct cloud repo calls during runtime.

This ensures that the final app remains stable and unaffected even if local development machines are offline or GitHub repo contents change after deployment.

**Communication Protocol:**

When implementing fixes or updates, provide only high-level bullet-point summaries describing what will be fixed (e.g., 'Fixed login button not responding'). Do not include code snippets, file names, line numbers, or implementation details unless explicitly requested. The user approves the concept, not the code.

Development Context
This project focuses on creating an application using the "creations-sdk" with integrated firmware and community-wiki support. Consistency with SDK instructions and firmware constraints is critical.

Copilot should assume:

The need to preserve modularity housing separate firmware, SDK, and wiki modules.

Emphasis on maintainability and compatibility of code changes with existing systems in the cloned repos.

Sensitivity to file and folder naming conventions as laid out in the repos.

The research md files, especially R1_App_Framework.md, provide the latest analysis and guides that must be honored for logic and design decisions.

Usage Instructions
Always aim to keep code suggestions aligned with the cloned repos and md research files.

When in doubt, do not guess implementations outside these provided sources.

Use this file as the primary baseline context for all Copilot suggestions related to this project.


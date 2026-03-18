# Architecture Decisions Log

> This file tracks every significant decision made during development, with reasoning. Maintained per the THUMB_RULE.md directive: _"You are a senior software architect. Explain decisions and maintain a log."_

---

## Decision #1 — Manual Vite Scaffolding Instead of create-vite CLI

**Date:** 2026-03-19  
**Context:** The project directory already contained markdown files (PROJECT_BRIEF.md, THUMB_RULE.md, OUTPUTBASED.md). The `create-vite` CLI refuses to scaffold in non-empty directories.  
**Decision:** Manually created `package.json`, `vite.config.js`, and `index.html` instead of using the CLI.  
**Why:** This gives us full control over every config option. No hidden boilerplate files to clean up. The CLI is just a convenience — the actual Vite project structure is simple enough to create manually (3 files). This is a pattern senior engineers use when integrating Vite into existing projects.  
**Trade-off:** We miss auto-generated `.eslintrc` and `.gitignore`, but these can be added later as needed.

---

## Decision #2 — Static JSON Data Layer (No Backend for MVP)

**Date:** 2026-03-19  
**Context:** The question bank is primarily a content-driven app. Questions don't change at runtime — they're curated by the developer.  
**Decision:** Store all questions as static JSON files imported at build time.  
**Why:**  
1. **Zero infrastructure cost** — no server, no database, no API to build or maintain  
2. **Instant load times** — data is bundled with the app, no network requests  
3. **Easy to add questions** — just edit a JSON file and the app rebuilds via HMR  
4. **Migration-friendly** — if we later need a backend, the JSON schema IS the API contract  

**Trade-off:** Can't do server-side search or pagination. But with ~100-200 questions expected, client-side filtering is perfectly fine.

---

## Decision #3 — Context API Over Redux/Zustand for State

**Date:** 2026-03-19  
**Context:** The app has two pieces of global state: theme (dark/light) and progress (done/review per question).  
**Decision:** Use React Context API with `useCallback` memoization.  
**Why:**  
1. **Simplicity** — 2 contexts, <50 lines each. Redux/Zustand would be overkill  
2. **No extra dependency** — Context is built into React  
3. **Per the THUMB_RULE.md** — "Don't use `useEffect` unless extremely necessary." Context with `useCallback` avoids unnecessary effects   
4. **localStorage persistence** — handled inline in the context methods, no middleware needed  

**Trade-off:** Context re-renders all consumers on any state change. For this app's scale (~20 questions, 2 global values), this is negligible.

---

## Decision #4 — CSS Modules Over Styled Components / Tailwind

**Date:** 2026-03-19  
**Context:** PROJECT_BRIEF.md listed CSS Modules in the folder structure. User didn't specify Tailwind.  
**Decision:** Use vanilla CSS with CSS Modules (`.module.css` files) and CSS custom properties for the design system.  
**Why:**  
1. **Scoped styles** — CSS Modules auto-namespace classes, no style leaks  
2. **Zero runtime cost** — unlike CSS-in-JS (styled-components), no JS execution for styles  
3. **Design tokens** — CSS custom properties (`--color-accent-primary`) make theming trivial and work natively with `[data-theme]` selectors  
4. **Industry standard** — Vite has built-in CSS Modules support, no config needed  

**Trade-off:** More verbose than Tailwind utility classes. But the explicit naming makes the code more readable and maintainable.

---

## Decision #5 — Question Extraction Strategy from Sources

**Date:** 2026-03-19  
**Context:** User wants to extract questions from external sources (like lydiahallie/javascript-questions) and categorize them per 8 patterns in OUTPUTBASED.md.  
**Decision:** Read the source, extract only output-based questions ("what's the output?"), map each to the most dominant pattern from OUTPUTBASED.md, and merge into existing JSON files.  
**Why:**  
1. **Pattern-first organization** — unlike the source which lists questions sequentially, we group by mental model. This helps the user build conceptual understanding, not just memorize answers  
2. **Deduplication** — we skip questions that duplicate concepts already covered by seed questions  
3. **Quality over quantity** — per THUMB_RULE.md, each question must "add to developing or improving the pattern/mental model"  

**Trade-off:** We may need to reword or restructure some questions to fit our schema (adding mentalModel, tags, etc.).

---

## Decision #6 — Comprehensive Extraction Over Conservative Curation

**Date:** 2026-03-19  
**Context:** Initial extraction from lydiahallie/javascript-questions yielded only 53 of 155+ questions. User rightly questioned why so few were captured.  
**Decision:** Re-extracted comprehensively — every output-based question that fits any of the 8 patterns, resulting in 112 questions.  
**Why:**  
1. **Coverage > Curation at this stage** — a question bank's value comes from breadth. Users can filter and skip, but they can't practice questions that aren't there  
2. **Mental model diversity** — similar-looking questions may test different edge cases of the same pattern. Including all strengthens the mental model  
3. **Source fidelity** — the source was carefully curated by a well-known educator. Filtering it further loses signal  

**Learnings:**  
- Read ALL source chunks before extraction (missed chunks 16-19 initially)  
- The ~43 excluded questions were genuinely non-output-based (conceptual, theoretical, or "which statement is true?" format)

---

## Decision #7 — GitHub MCP Server for Automation

**Date:** 2026-03-19  
**Context:** User wanted to push the project to GitHub and asked about MCP server integration for automation.  
**Decision:** Set up `@modelcontextprotocol/server-github` MCP server with a fine-grained GitHub PAT, configured in `~/.gemini/antigravity/mcp_config.json`.  
**Why:**  
1. **Future automation** — in future conversations, GitHub operations (create repos, PRs, issues, manage branches) can happen directly without leaving the editor  
2. **Fine-grained PAT over classic tokens** — scoped to specific permissions (Contents + Administration), can be set to expire, and can be restricted to specific repos if needed  
3. **MCP over CLI** — `gh` CLI wasn't installed. MCP server runs via `npx` (no global install), and integrates directly with the editor's AI capabilities  

**Trade-off:** Requires editor restart to activate new MCP servers. For the initial push, we used the GitHub API directly via `curl` (which is essentially what the MCP server does under the hood). The MCP server becomes valuable for ongoing use.

---

## Decision #8 — Git Workflow: Inline Token Auth Over SSH

**Date:** 2026-03-19  
**Context:** Needed to push the initial commit to GitHub. SSH keys weren't configured on this machine.  
**Decision:** Used HTTPS with inline credential helper to authenticate via PAT for the initial push.  
**Why:**  
1. **Zero setup** — no SSH key generation, no `~/.ssh/config`, no `ssh-add`  
2. **Works immediately** — PAT was already available from the MCP setup  
3. **Temporary auth** — the inline credential helper doesn't persist the token in git config (more secure than hardcoding in the remote URL)  

**Trade-off:** For daily development, SSH keys or `gh auth login` would be more ergonomic. This was optimized for a one-time push. User should consider setting up SSH or `gh` CLI for future git workflows.

---

## Decision #9 — .gitignore Before First Commit

**Date:** 2026-03-19  
**Context:** The project had no .gitignore when git was initialized.  
**Decision:** Created .gitignore BEFORE `git add -A` to ensure `node_modules/`, `dist/`, `.env*`, and OS files never enter version history.  
**Why:**  
1. **History hygiene** — once a file is committed, removing it from history is painful (`git filter-branch` or BFG Repo Cleaner)  
2. **Repo size** — `node_modules/` was 70+ packages and would bloat the repo from ~63KB to potentially 50MB+  
3. **Security** — `.env*` files may contain secrets in the future. Blocking them from day 1 is a defensive practice  

**Trade-off:** None — this is always the right move.

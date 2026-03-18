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

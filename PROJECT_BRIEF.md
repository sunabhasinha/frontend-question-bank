# PROJECT_BRIEF.md — Template

> Fill out each section below before starting development. Delete any sections that don't apply. Replace all `[placeholder]` text with your details.

---

## 1. Product Overview

### Project Name
The ultimate Frontend Question bank

### One-Liner
A one stop question bank for mid to senior frontend engineers to cover all patterns and mental modals required for interviews.

### Problem Statement
For frontent interview prepation the resources are not organized and it is very hard to find the questions based on the topics. Questions are not organised in a manner  at one place to develop the mental modal of the concept/defination to solve the problem. Solving this question bank the user should develop the mental modal of the concept/defination to solve the problem from one source itself over all the important topics in mid to senior frontend interview.

### Target Users
- **Primary:** Mid-senior level and senior level frontend engineers
- **Secondary:** Indivial users who want to prepare for frontend interviews

### Core Features (MVP)
1. [Feature 1 Collect all the required question from a source that covers all the patterns asked in an mid to senior frontend interview of a particular topic]
2. [Feature 2 — e.g., Dashboard with analytics charts]
3. [Feature 3]
4. [Feature 4]

### Out of Scope (for now)
- [Feature explicitly excluded from v1 — e.g., Mobile app, payment integration]

### Success Metrics
- [e.g., Page load under 2s, 90%+ Lighthouse score, support 1000 concurrent users]

---

## 2. Technical Specification

### Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | [e.g., React 18 + Vite]            |
| Styling      | [e.g., Tailwind CSS v3 / Vanilla CSS / MUI] |
| State Mgmt   | [e.g., Redux Toolkit / Zustand / Context API] |
| Backend      | [e.g., Node.js + Express / Django / Spring Boot] |
| Database     | [e.g., MongoDB / PostgreSQL / Firebase] |
| Hosting      | [e.g., Vercel + Railway / AWS / Heroku] |
| Other        | [e.g., Socket.io, Redis, S3, Stripe] |

### Architecture Pattern
[e.g., Monolithic MVC ]

### Key Architecture Decisions
- [e.g., "Using MongoDB for flexible schema during rapid iteration"]

### Data Model (Key Entities)

```
User
├── id, name, email, password_hash, role
├── created_at, updated_at
└── relations: has_many Posts, has_one Profile

Post
├── id, title, content, status (draft/published)
├── author_id (FK → User)
└── relations: belongs_to User, has_many Comments
```

### Third-Party Integrations
NA
---

## 3. Code Style & Conventions

### General Rules
- **Language:** [JavaScript ES6+]
- **Formatting:** [Prettier with default config / custom config below]
- **Linting:** [ESLint — Airbnb / Standard / custom]

### Naming Conventions

| Element         | Convention           | Example                    |
|-----------------|----------------------|----------------------------|
| Files (components) | PascalCase        | `UserProfile.jsx`          |
| Files (utils)   | camelCase            | `formatDate.js`            |
| Files (styles)  | [match component]    | `UserProfile.module.css`   |
| Variables       | camelCase            | `userName`                 |
| Constants       | SCREAMING_SNAKE      | `MAX_RETRY_COUNT`          |
| CSS Classes     | [BEM / camelCase / kebab-case] | `.card__header--active` |
| DB Tables       | [snake_case / PascalCase] | `user_sessions`       |

### Folder Structure

```
src/
├── components/        # Reusable UI components
│   └── Button/
│       ├── Button.jsx
│       ├── Button.test.jsx
│       └── Button.module.css
├── pages/             # Route-level page components
├── hooks/             # Custom React hooks
├── context/           # React context providers
├── services/          # API calls and external service wrappers
├── utils/             # Pure helper functions
├── assets/            # Static files (images, fonts, icons)
├── styles/            # Global styles and design tokens
├── constants/         # App-wide constants and enums
└── types/             # TypeScript types/interfaces (if using TS)
```

### Patterns & Preferences
- [ ] Functional components only (no class components)
- [ ] Custom hooks for reusable logic
- [ ] Named exports over default exports
- [ ] Absolute imports (e.g., `@/components/Button`)
- [ ] Co-located tests (`Component.test.jsx` next to `Component.jsx`)
- [ ] Error boundaries for critical UI sections
- [ ] [Add your own preferences]

---

## 4. Git & Collaboration

### Branch Strategy
[e.g., Git Flow / GitHub Flow / Trunk-based]

```
main          ← Production-ready code
├── develop   ← Integration branch
│   ├── feature/user-auth
│   ├── feature/dashboard
│   └── bugfix/login-error
```

### Commit Message Format
```
type(scope): short description

[optional body]

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(auth): add Google OAuth login flow
```

### PR Conventions
- [e.g., Require 1 approval, squash merge, link to issue]

---

## 5. Environment Setup

### Prerequisites
- Node.js [version, e.g., >= 18.x]
- [Package manager, e.g., npm / yarn / pnpm]
- [Database, e.g., MongoDB 7.x running locally or Atlas URI]
- [Other, e.g., Docker, Redis]

### Environment Variables

```env
# .env.example
NODE_ENV=development
PORT=3000
DATABASE_URL=[your_database_connection_string]
JWT_SECRET=[your_jwt_secret]
# Add all required env vars here
```

### Setup Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## 6. UI/UX Guidelines

### Design References
- [Figma link / Dribbble inspiration / competitor screenshots]
- [e.g., "Clean, modern look similar to Linear.app or Notion"]

### Color Palette

| Role       | Color     | Hex       |
|------------|-----------|-----------|
| Primary    | [name]    | `#______` |
| Secondary  | [name]    | `#______` |
| Accent     | [name]    | `#______` |
| Background | [name]    | `#______` |
| Text       | [name]    | `#______` |
| Error      | [name]    | `#______` |
| Success    | [name]    | `#______` |

### Typography
- **Font Family:** [e.g., Inter, Roboto, System default]
- **Headings:** [e.g., Bold, sizes 32/24/20/16]
- **Body:** [e.g., Regular 16px, line-height 1.6]

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px — 1024px`
- Desktop: `> 1024px`

### Phase 2 — Enhancements (Target: [date])
- [ ] [Feature 3]
- [ ] [Feature 4]
- [ ] [Performance optimization]

### Phase 3 — Scale (Target: [date])
- [ ] [Advanced feature]
- [ ] [Mobile app / PWA]
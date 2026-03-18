# JavaScript Output-Based Questions — Extraction & Categorization Guide

> When a source is provided, extract all output-based questions and categorize them under the matching pattern/concept below. If a question spans multiple patterns, place it under the **most dominant** pattern and cross-reference the secondary one.

---

## How to Use This File

1. **Receive a source** (URL, PDF, document, code snippet, etc.)
2. **Extract** all output-based / "what will this print?" style questions
3. **Categorize** each question under the correct pattern below
4. **Tag difficulty**: 🟢 Mid | 🟡 Senior | 🔴 Staff
5. **Flag gaps**: After extraction, list any patterns below that had **zero** questions — these are gaps to fill from other sources

---

## Patterns & Categories

### 1. The Event Loop & Asynchronous JavaScript
- Microtasks vs. Macrotasks (Execution order of `Promise.then()`, `queueMicrotask()`, `setTimeout()`, `setInterval()`)
- Promise Chaining & Return Values
- `async`/`await` Suspension behavior
- Uncaught Rejections

### 2. Execution Context & `this` Keyword
- Default and Implicit Binding
- Explicit Binding (`.call()`, `.apply()`, `.bind()`)
- Arrow Functions and Lexical `this`
- The `new` Keyword Binding

### 3. Scope & Hoisting
- Variable Hoisting (`var` vs. `let`/`const`)
- Temporal Dead Zone (TDZ)
- Function Declarations vs. Function Expressions
- Block Scope vs. Function Scope

### 4. Closures & Lexical Environment
- Basic Closures and scoping
- Stale Closures (especially relevant for React Hooks)
- Closures inside Loops (e.g., `for` loop with `var` vs `let`)
- Data Privacy and Encapsulation patterns

### 5. Type Coercion & Equality
- Implicit Coercion (String concatenation vs. Math operations)
- Object-to-Primitive Coercion (`valueOf()`, `toString()`)
- Truthy vs Falsy evaluation
- Equality Quirks (`==` vs. `===`)
- `typeof` Quirks (e.g., `typeof null`)

### 6. Object References & Mutability
- Pass by Value vs. Pass by Reference
- Shallow vs. Deep Copy (using spread operator `...` or `Object.assign()`)
- Object Keys stringification evaluation
- Garbage Collection behavior and memory leaks

### 7. Prototypes & Inheritance
- Prototypal Chain Lookup
- Modifying Prototypes (e.g., `Array.prototype`)
- `Object.create()` vs. Object Literals

### 8. ES6+ Syntax Quirks
- Destructuring (Default values, deeply nested destructuring)
- Rest and Spread Operators (Execution order, overwriting properties)
- Default Parameters evaluation time
- Tagged Template Literals parsing
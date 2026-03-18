// Topic metadata for 8 JS output-based question categories
// Each topic maps to a question JSON file in ./questions/

const TOPICS = [
  {
    id: 'event-loop',
    name: 'Event Loop & Async',
    icon: '🔄',
    color: '#7c5cfc',
    description: 'Microtasks vs Macrotasks, Promise chaining, async/await suspension, uncaught rejections.',
    fileName: 'eventLoop',
  },
  {
    id: 'this-keyword',
    name: 'Execution Context & this',
    icon: '🎯',
    color: '#3ecfb2',
    description: 'Default, implicit, explicit binding, arrow functions, the new keyword.',
    fileName: 'thisKeyword',
  },
  {
    id: 'scope-hoisting',
    name: 'Scope & Hoisting',
    icon: '📦',
    color: '#ffb86c',
    description: 'var vs let/const hoisting, TDZ, function declarations vs expressions, block vs function scope.',
    fileName: 'scopeHoisting',
  },
  {
    id: 'closures',
    name: 'Closures & Lexical Env',
    icon: '🔒',
    color: '#ff6b9d',
    description: 'Basic closures, stale closures in React, closures in loops, data privacy patterns.',
    fileName: 'closures',
  },
  {
    id: 'type-coercion',
    name: 'Type Coercion & Equality',
    icon: '🔀',
    color: '#50fa7b',
    description: 'Implicit coercion, object-to-primitive, truthy/falsy, == vs ===, typeof quirks.',
    fileName: 'typeCoercion',
  },
  {
    id: 'object-references',
    name: 'Object References & Mutability',
    icon: '🧬',
    color: '#bd93f9',
    description: 'Pass by value vs reference, shallow vs deep copy, key stringification, garbage collection.',
    fileName: 'objectReferences',
  },
  {
    id: 'prototypes',
    name: 'Prototypes & Inheritance',
    icon: '🧱',
    color: '#8be9fd',
    description: 'Prototypal chain lookup, modifying prototypes, Object.create() vs object literals.',
    fileName: 'prototypes',
  },
  {
    id: 'es6-quirks',
    name: 'ES6+ Syntax Quirks',
    icon: '⚡',
    color: '#f1fa8c',
    description: 'Destructuring, rest/spread, default parameters, tagged template literals.',
    fileName: 'es6Quirks',
  },
];

export { TOPICS };

# React JSON Forms Generator

A dynamic form generator that creates forms based on JSON configuration.

## How to run

```bash
npm i
npm run prepare
npm run dev
```

## Testing

```bash
npm run test
```

## Technical Decisions

### Why Panda CSS?

Having worked with raw CSS classes (also Less/Sass), runtime styles (like Emotion), Tailwind and Panda CSS and I chosed pandacss since it gives standard CSS properties while still providing compressed class names with also support for Tailwind-like naming while providing litte runtime overhead with nice DX on top.

## My Approach to This Task

### Core Principles I Followed

**Simplicity over premature optimization:**

- No router implementation since there's only one route
- Used React's built-in state management
- Avoided virtualization for large forms - assumed this task is designed for a simple form generator, not intended for forms with 1000+ fields
- Minimized third-party libraries
- Didn't prematurely memoize components unless actually needed - React's compiler when released will handles this well out of the box
- Used `filter().map()` over `reduce()` for better readability unless there's a clear performance bottleneck

**Built for extensibility:**

- Created composable components for reusability
- Integrated Radix UI for accessibility
- Prepared for internationalization (i18n)
- Used Panda CSS with headless components for flexible styling
- Set up testing to cover basic functionality
- Standard DX with Prettier, ESLint, and TypeScript

**Stayed within scope:**

- Focused on the core task without overextending (No nested forms or advanced form validation)
- Covered all requirements without scope creep

**Left room for improvement:**

since there is always a time that we can allocate for different project I left few things that could be improved:

- Could add more Radix UI/React aria components
- Could implement a custom calendar picker instead of relying on browser defaults
- Could use custom defined styles from the theme more consistently across the app
- Could add more granular tests for each component
- Could implement `@import` patterns for styles and components

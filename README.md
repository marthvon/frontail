
# Tailwind++ Extension

**Author:** marthvon \<mamertvonn@gmail.com>

*"With a tailwind at your back, all your frontend needs is a **front tail**."*

Consist of plugins and utility css file that integrates with Tailwind seamlessly.

> Note: Only works for TailwindCss versions <u>></u> 4.0

# Installation Guide

``` bash
npm install tailwindcss postcss postcss-import autoprefixer @marthvon/frontail
```

# Configuration Setup 

## TailwindCss Configuration
> tailwind.config.ts
```typescript
const config: Config = {
  content: [
    // ...
    /*Add*/ "./node_modules/@marthvon/frontail/**/*.{js,ts,jsx,tsx,mdx,css}"
// ...
```

## PostCss Configuration
Tailwind v4 Default configuration should look like this
> postcss.config.mjs
```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-import": {},
    autoprefixer: {}
  },
};

export default config;
```

# Getting Started

> tailwind.config.ts
```typescript
// ...
import plugin from 'tailwindcss/plugin';
const { 
  ColorfulScrollbar, AnimationDuration,
  AnimationDelay, AnimationIteration,
  heightScreens
} = require('@marthvon/frontail/plugin');
const config: Config = {
  // ...
  theme: {
    extent: {
      screens: heightScreens,
  // ... Or
  plugins: [
    plugin(ColorfulScrollbar), 
    plugin(AnimationDuration),
    plugin(AnimationDelay),
    plugin(AnimationIteration),
  ],
}
// ...
```

## Also

> global.css
```css

/* Optionally,use config like prior versions < v4.0 */
@config '../../tailwind.config.ts'; 

/* themes, like extending media queries dimensions */
@import '../../node_modules/@marthvon/frontail/theme/extraScreens.css';

/* utilitiy classes */
@import '../../node_modules/@marthvon/frontail/base/input.css';
@import '../../node_modules/@marthvon/frontail/theme/keyframes.css';
@import '../../node_modules/@marthvon/frontail/utilities/animate.css';
@import '../../node_modules/@marthvon/frontail/utilities/scrollbar.css';
@import '../../node_modules/@marthvon/frontail/utilities/3d.css';
@import '../../node_modules/@marthvon/frontail/utilities/layouts.css';
@import '../../node_modules/@marthvon/frontail/utilities/modal.css';
@import '../../node_modules/@marthvon/frontail/utilities/text.css';

```
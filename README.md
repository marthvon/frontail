
# Tailwind++ Extension

**Author:** marthvon \<mamertvonn@gmail.com>

*"With a tailwind at your back, all your frontend needs is a **front tail**."*

Consist of plugins and utility css file that integrates with Tailwind seamlessly.

> Note: Only works for TailwindCss versions <u>></u> 4.0

# Installation Guide

``` bash
npm install tailwindcss postcss postcss-import autoprefixer @marthvon/frontail --save-dev
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
@import '../../node_modules/@marthvon/frontail/utilities/layers.css';

```

# Stacking (z-index)

Every z-index in frontail comes from one scale of CSS variables. Each has a default, so nothing breaks if you never define them:

| Variable | Default | Utility | Use for |
| --- | --- | --- | --- |
| `--z-raised` | 1 | `z-raised` | overlap inside one component, like an icon over its input |
| `--z-sticky` | 2 | `z-sticky` | sticky table headers and toolbars |
| `--z-backdrop` | 40 | `z-backdrop` | click-out backdrops (`modal-background`) |
| `--z-popover` | 50 | `z-popover` | dropdowns, menus, select lists, date picker popups |
| `--z-modal` | 60 | `z-modal` | dialogs and full-screen panels |
| `--z-toast` | 70 | `z-toast` | toasts and notices |

Rules for new components and for app code:

- Use a variable or its utility. Never write a raw number like `z-10`, because two layers with the same number are ordered by where they sit in the page.
- 0 to 9 is for overlap inside a component. 10 to 39 is free for your app's own page chrome, like a fixed navbar. 40 and up is for overlays.
- A popover sits above its own backdrop, so opening a dropdown dims or blocks everything except its menu.
- To move a layer, set the variable on `:root`, for example `:root { --z-popover: 1000; }`. Every component follows.
- Layers opened from other layers count up. When a dialog opens another dialog, or a menu inside a dialog, give the new one its opener's z-index plus one, for example `--z-modal + 1`. Because the variables inherit, setting `--z-popover` and `--z-backdrop` on an element moves every popover and backdrop inside it. gibbing components do this for you through their `zIndex` prop.
- z-index only orders things inside the same stacking context. A parent with `transform`, `filter`, `opacity` below 1, or its own z-index traps a popover inside it, so keep dropdowns out of those parents or raise the parent itself.

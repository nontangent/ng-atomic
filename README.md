Not recommended because the interface is unstable. Don't believe what it says!

# Ng Atomic(Alpha)
This is an atomic design system framework based on Angular for all web platforms such as React, Vue or of cource Angular.

<strong><pre>ng add @ng-atomic/schematics</pre></strong>

## Concept
- Quickly Generate an Atomic Design System
- Injectable Layered Component Architecture
- Available on All Web Platforms via Web Components

## Quick Start
```sh
# Setup workspace (If you use, run `ng add @ng-atomic/schematics`)
$ npx create-ng-atomic-workspace
# Generate 
$ nx g template example
# Deploy webcomponents and storybook to GitHub Pages
$ nx deploy components
```

```tsx
import React, { useEffect } from 'react';
import Script from 'next/script'

export function Index() {
  useEffect(() => {
    window.addEventListener('ElementsLoaderReady', async () => {
      const loader = window['ElementsLoaderProxy']('@ng-atomic/components');
      await loader.load('templates-example');
    });
  });

  return (<>
    <h1>Ng Atomic Demo for Next</h1>
    <Script src='http://localhost:4202/main.js' defer></Script>
    <templates-example></templates-example>
  </>
  );
}

export default Index;
```


## Compatibility
| Angular | NgAtomic   |
| --------|----------- |
| 14      | 4.x.x      |
| 13      | 3.x.x      |
| 12      | 2.x.x      |
| 11      | 1.x.x      |

## @ng-atomic/schematics
Generators for atomic components and design system workspace.

```sh
$ ng add @ng-atomic/schematics
$ ng g @ng-atomic/schematics:components
```

## @ng-atomic/components
Base components for Atomic Design System

Look at [the storybook](https://nontangent.github.io/ng-atomic/storybook/).


## @ng-atomic/elements
Web Components Library 

```ts
// elements.ts
import { ElementsLoader } from '@ng-atomic/elements';

const loader = new ElementsLoader();
loader.register([
  {
    name: '@ng-atomic/components/entrance',
    bootstrap: () => import('./templates/entrance').then(m => m.EntranceModule),
  },
]);

```

```js
// index.js
import { EntranceConfig } from '@ng-atomic/components/entrance'

loader.load('@ng-atomic/templates/entrance', [
  {
    provide: EntranceConfig,
    useValue: {
      title: 'Sign In / Sign Up',
    },
  },
]);
```

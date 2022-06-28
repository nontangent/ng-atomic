# Ng Atomic
Atomic Design System Framework Based on Angular
<!-- Angularのためのアトミックデザインシステムフレームワーク -->

## Concept
<!-- アトミックデザインシステムを一瞬で生成できる -->
- Generate Atomic Design System Quickly
<!-- 置き換え可能な階層化アーキテクチャ -->
- Replaceable Layered Component Architecture
<!-- すべてのプラットフォームで利用できる -->
- Universal Platform like Angular, React or Vue via WebComponents.

## @ng-atomic/schematics
Generators for atomic components and design system workspace.

```sh
$ ng add @ng-atomic/schematics
$ ng g @ng-atomic/schematics:components
```

## @ng-atomic/components
Base components for Atomic Design System

Look at [the storybook]().


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

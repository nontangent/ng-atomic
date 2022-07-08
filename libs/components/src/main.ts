import { enableProdMode } from '@angular/core';
import { ElementsLoader, NgAtomicModule } from './elements-loader';


enableProdMode();

const NAME = '@ng-atomic/components';
const REGISTRY_NAME = '__NG_ATOMIC_ELEMENTS__';

(window[REGISTRY_NAME] = window[REGISTRY_NAME] ?? []).push([
  NAME, new ElementsLoader(NgAtomicModule),
]);

window['ElementsLoaderProxy'] ??= (targetName: string) => {
  return window[REGISTRY_NAME].find(([name]) => name === targetName)?.[1];
};

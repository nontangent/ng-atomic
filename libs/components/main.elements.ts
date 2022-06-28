import { enableProdMode } from '@angular/core';
import { ElementsConfig, ElementsLoader, elementsLoaderFactory, parseName } from '@ng-atomic/elements';


enableProdMode();

(window as any).ElementsLoader ??= elementsLoaderFactory();

const loader: ElementsLoader = (window as any).ElementsLoader;
const ELEMENTS = [
  'atoms-chips-input',
  'atoms-smart-menu-button',
  'molecules-actions-column',
  'molecules-checkbox-column',
  'molecules-chips-input-field',
  'molecules-date-input-field',
  'molecules-select-input-field',
  'molecules-smart-column',
  'molecules-text-input-field',
  'molecules-textarea-field',
  'organisms-action-buttons-section',
  'organisms-back-navigator',
  'organisms-card-input-section',
  'organisms-cvc-and-exp-input-section',
  'organisms-date-input-section',
  'organisms-heading',
  'organisms-menu',
  'organisms-navigator',
  'organisms-paginator',
  'organisms-select-input-section',
  'organisms-smart-table',
  'organisms-social-login-section',
  'organisms-text-input-section',
  'organisms-textarea-section',
  'organisms-top-navigator',
  'templates-entrance',
  'templates-loading',
  'templates-menu',
  'templates-smart-crud',
  'templates-smart-index',
  'pages-_index',
  'pages-blank',
  'frames-auto-layout',
  'frames-card',
  'frames-drawer',
  'frames-line-up',
  'frames-line-up-v2',
  'frames-overlay',
  'frames-overlay-v2',
  'frames-scroll',
  'frames-smart-menu',
] as const;

function resolveConfig(config: string | ElementsConfig): ElementsConfig {
  if (typeof config === 'string') {
    const [type, name, moduleName] = parseName(config);
    return {name: config, bootstrap: () => import(`./${type}/${name}/${name}.module`).then(m => m[moduleName])}
  } else {
    return config;
  }
}

loader.register(ELEMENTS.map(resolveConfig));

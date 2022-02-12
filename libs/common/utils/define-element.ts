import { Injector } from '@angular/core';

export async function defineElement(injector: Injector, Component: any) {
  return import('@angular/elements').then(({createCustomElement}) => {
    const el = createCustomElement(Component, { injector });
    customElements.define('pages-blank', el);
  });
}

import { createNgModuleRef, Injector, NgModuleRef, Type } from '@angular/core';

function getSelectors(Component: Type<any>): string {
  return (Component as any).ɵcmp.selectors;
}

export async function defineElement(
  Component: Type<any>,
  injector: Injector, 
  name: string = getSelectors(Component)?.[0],
) {
  return import('@angular/elements').then(({ createCustomElement }) => {
    customElements.define(name, createCustomElement(Component, { injector }));
  }).then(() => {
    // TODO(nontangent): execute onSuccess function from injector
  }).catch((error) => {
    throw error;
    // TODO(nontangent): execute onError function from injector
  });
}

export function defineElements(componentTypes: Type<any>[], injector: Injector) {
  return Promise.all(componentTypes.map((componentType: Type<any>) => {
    return defineElement(componentType, injector);
  }));
}

import { Injector, Type } from '@angular/core';

function getSelectors(Component: Type<any>): string {
  return (Component as any).ɵcmp.selectors;
}

function getDeclarations(Module: Type<any>) {
  return (Module as any).ɵmod.declarations;
}

export async function defineElement(
  injector: Injector, 
  Component: Type<any>,
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

export function defineElements(ngModule: any) {
  const declarations = getDeclarations(ngModule.constructor as any);
  return Promise.all(declarations.map((Component: Type<any>) => {
    return defineElement(ngModule.injector, Component);
  }));
}

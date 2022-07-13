import { Injector, Type } from '@angular/core';

const getSelectors = (componentType: Type<any>): string  => (componentType as any).ɵcmp.selectors;
const resolveSelector = (componentType: Type<any>): string => getSelectors(componentType)?.[0];

export async function defineElement(
  componentType: Type<any>,
  injector: Injector, 
  name: string = resolveSelector(componentType),
) {
  const { createCustomElement } = await import('@angular/elements');
  return customElements.define(name, createCustomElement(componentType, { injector }));
}

export function defineElements(componentTypes: Type<any>[], injector: Injector) {
  const promises = componentTypes.map((t: Type<any>) =>  defineElement(t, injector));
  return Promise.all(promises);
}

import { ElementsLoader } from "../elements-loader";

export const REGISTRY_NAME = '__NG_ATOMIC_ELEMENTS__';

export type ElementsLoaderFactory = () => Promise<ElementsLoader>;

export class ElementsLoaderRegistry {
  static get REGISTRY(): Record<string, {factory: ElementsLoaderFactory, instance: ElementsLoader | null}> {
    return ((window as any)[REGISTRY_NAME] = (window as any)[REGISTRY_NAME] ?? {});
  }

  static registerFactory(name: string, factory: () => Promise<ElementsLoader>) {
    this.REGISTRY[name] = {factory, instance: null};
  }

  static async getInstance(name: string): Promise<ElementsLoader> {
    const factoryRef = this.REGISTRY[name];
    return factoryRef.instance || await factoryRef.factory();
  }
}
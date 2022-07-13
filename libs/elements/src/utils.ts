import { classify } from '@angular-devkit/core/src/utils/strings';
import { createNgModuleRef, Injector, ModuleWithProviders, NgModule, NgModuleRef, Provider, Type } from '@angular/core';

export interface ExtraNgModule {
  imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
  providers?: Provider[];
}

export interface InternalNgModuleRef<T> extends NgModuleRef<T> {
  _bootstrapComponents: Type<any>[];
}

export function parseName(_name: string): [string, string, string] {
  const [type, ...words] = _name.split('-');
  const name = words.join('-');
  const moduleName = `${classify(name)}Module`;
  return [type, name, moduleName];
}

export const modulePathWrapper = (path: string) => path.match(/^\.\/(.+)\.module$/)?.[1];
export const resolveModulePathAndName = (selector: string) => {
  const [type, name, moduleName] = parseName(selector);
  const path = `./${type}/${name}/${name}.module`;
  return [path, moduleName];
}

export function createInternalNgModuleRef<T>(moduleType: Type<T>, injector: Injector): InternalNgModuleRef<T> {
  return createNgModuleRef(moduleType, injector) as InternalNgModuleRef<T>;
}

export const isCompilerPublished = (): boolean => (window as any)?.ng?.ɵcompilerFacade;
export const publishFacade = (global = window) => import('@angular/compiler').then(m => m.publishFacade(global));


export const _ngModuleFactory = (extraNgModule: ExtraNgModule) => {
  return NgModule({
    imports: [...(extraNgModule.imports ?? [])],
    providers: [...(extraNgModule.providers ?? [])],
    jit: true,
  })(class _ { });;
}

export async function ngModuleFactory(extraNgModule: ExtraNgModule = {}): Promise<Type<any>> {
  // MEMO(nontangent): Initialize and publish JIT compiler facade for compiling BootStrapModule just in time.
  if (!isCompilerPublished()) await publishFacade();
  return _ngModuleFactory(extraNgModule);
}

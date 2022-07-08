import { Injectable, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseElementsLoader } from '@ng-atomic/elements';
import { parseName } from '@ng-atomic/elements/parse-name';

export const modulePathWrapper = (path: string) => path.match(/^\.\/(.+)\.module$/)?.[1];
export const resolveModulePath = (selector: string) => {
  const [type, name, moduleName] = parseName(selector);
  const path = `./${type}/${name}/${name}.module`;
  return [path, moduleName];
}

export function importNgModule(selector: string) {
  const [path, name] = resolveModulePath(selector);
  const _path = modulePathWrapper(path);
  return import(`./${_path}.module`).then(m => m?.[name]);
}

export const NgAtomicModule = {
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: 'IMPORT_NG_MODULE', useValue: importNgModule },
  ],
  platformFactory: () => platformBrowserDynamic(),
  import: importNgModule
}

// @NgModule({
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//   ],
//   providers: [
//     { provide: 'IMPORT_NG_MODULE', useValue: importNgModule },
//   ],
// })
// export class ElementsModule implements DoBootstrap {
//   ngDoBootstrap(appRef: ApplicationRef): void { }
// }

@Injectable()
export class ElementsLoader extends BaseElementsLoader {
  protected resolveModule(selector: string): Promise<Type<any>> {
    return NgAtomicModule.import(selector);
  }
}


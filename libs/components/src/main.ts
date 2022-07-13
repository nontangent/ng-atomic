import { enableProdMode, getPlatform } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ElementsLoader, ElementsLoaderProxy } from '@ng-atomic/elements';
import { AppModule } from './app.module';
import packageJson from './package.json';
import 'zone.js';

enableProdMode();

const elementsLoaderFactory = () => (getPlatform() || platformBrowserDynamic())
  .bootstrapModule(AppModule)
  .then(({injector}) => injector.get(ElementsLoader));

ElementsLoaderProxy.registerFactory(packageJson.name, elementsLoaderFactory);
window['ElementsLoaderProxy'] ??= (name: string) => new ElementsLoaderProxy(name);
window.dispatchEvent(new Event(`ElementsLoaderReady`));

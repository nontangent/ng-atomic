import { enableProdMode, PlatformRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

enableProdMode();

let platform: PlatformRef;

(window as any).loadElement = async (_path: string) => {
  platform ??= platformBrowserDynamic();

  const [path, ModuleName] = _path.split('#');
  const m = await import(`../../../libs/components/${path}.element`);

  platform
    .bootstrapModule(m[ModuleName])
    .catch((err) => console.error(err));
}


// loadElement('pages/blank/blank#BlankElementModule');
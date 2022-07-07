import { Injectable } from '@angular/core';
import { BaseElementsLoader } from '@ng-atomic/elements';

@Injectable()
export class ElementsLoader extends BaseElementsLoader {
  protected async import(type: string, name: string, moduleName: string): Promise<any> {
    return import(`./${type}/${name}/${name}.module`).then(m => m?.[moduleName]);
  }
}


import { createNgModuleRef, Inject, Injectable, InjectionToken, Injector, Type } from "@angular/core";
import { defineElements } from "../define-elements";
import { createInternalNgModuleRef, ExtraNgModule, ngModuleFactory } from "../utils";

export type ImportNgModule = (selector: string) => Promise<Type<any>>;
export const IMPORT_NG_MODULE = new InjectionToken<ImportNgModule>('[@ng-atomic/elements] ');


@Injectable({ providedIn: 'root' })
export class ElementsLoader {
  constructor(
    @Inject(IMPORT_NG_MODULE) protected importNgModule: ImportNgModule,
    protected injector: Injector,
  ) { }

  async load(key: string, selectors: string[] = [], extraNgModule?: ExtraNgModule) {
    return this.importNgModule(key)
      .then(async (moduleType) => {
        const parentInjector = await this.getParentInjector(extraNgModule);
        const {_bootstrapComponents, injector} = createInternalNgModuleRef(moduleType, parentInjector);
        await defineElements(_bootstrapComponents, injector);
      });
  }

  private async getParentInjector(extraNgModule?: ExtraNgModule): Promise<Injector> {
    return extraNgModule ? this.getInjectorWith(extraNgModule) : this.injector;
  }

  private async getInjectorWith(extraNgModule: ExtraNgModule): Promise<Injector> {
    const ngModuleType = await ngModuleFactory(extraNgModule);
    return createNgModuleRef(ngModuleType, this.injector).injector;
  }

}


import { 
  createNgModuleRef, DoBootstrap, Inject, Injector, 
  ModuleWithProviders, 
  NgModule, PlatformRef, Provider, StaticProvider, Type
} from "@angular/core";
import { defineElements } from "./define-elements";
import { parseName } from "./resolve-config";

interface Config {
  imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
  providers?: Provider[];
  platformFactory: () => PlatformRef;
  errorHandler?: () => {};
}

export abstract class BaseElementsLoader {

  protected _platform: PlatformRef | null = null;
  protected get platform(): PlatformRef {
    return this._platform ??= this.config.platformFactory();
  }

  constructor(protected config: Config) { }

  protected abstract import(type: string, name: string, module: string): Promise<any>;

  protected async resolveModule(name: string): Promise<Type<any>> {
    return this.import(...parseName(name));
  }

  protected async buildBootstrapModule(moduleType: any, extraProviders: StaticProvider[] = []): Promise<Type<any>> {
    // MEMO(nontangent): initialize and publish JIT compiler facade for compiling BootStrapModule just in time.
    if (!(window as any)?.ng?.ɵcompilerFacade) {
      await import('@angular/compiler').then(({publishFacade}) => publishFacade(window));
    }

    @NgModule({
      imports: [...(this.config.imports ?? [])],
      providers: [...(this.config.providers ?? []), ...extraProviders],
      jit: true,
    })
    class BootstrapModule implements DoBootstrap {
      constructor(@Inject(Injector) public injector: Injector) { }
    
      async ngDoBootstrap() {
        const { injector } = createNgModuleRef(moduleType, this.injector);
        await defineElements(injector, moduleType);
      }
    };

    return BootstrapModule;
  }

  async load(name: string, extraProviders: StaticProvider[] = []) {
    return this.resolveModule(name)
      .then(Module => this.buildBootstrapModule(Module, extraProviders))
      .then((BootstrapModule) => this.platform.bootstrapModule(BootstrapModule))
      .catch((err) => console.error(err));
  }
}

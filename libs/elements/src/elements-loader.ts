import {
  createNgModuleRef, DoBootstrap, Injector, ModuleWithProviders, 
  NgModule, NgModuleRef, PlatformRef, Provider, StaticProvider, Type
} from "@angular/core";
import { defineElements } from "./define-elements";
import { parseName } from "./parse-name";

interface Config {
  imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
  providers?: Provider[];
  platformFactory: () => PlatformRef;
  errorHandler?: () => {};
}

interface InternalNgModuleRef<T> extends NgModuleRef<T> {
  _bootstrapComponents: Type<any>[];
}

function createInternalNgModuleRef<T>(moduleType: Type<T>, injector: Injector): InternalNgModuleRef<T> {
  return createNgModuleRef(moduleType, injector) as InternalNgModuleRef<T>;
}

const isCompilerPublished = (): boolean => (window as any)?.ng?.ɵcompilerFacade;
const publishFacade = (global = window) => import('@angular/compiler').then(m => m.publishFacade(global));


export abstract class BaseElementsLoader {

  protected _platform: PlatformRef | null = null;
  protected get platform(): PlatformRef {
    return this._platform ??= this.config.platformFactory();
  }

  constructor(protected config: Config) { }

  protected abstract resolveModule(name: string): Promise<Type<any>>;

  protected async buildBootstrapModule<T = any>(moduleType: Type<T>, extraProviders: StaticProvider[] = []): Promise<Type<any>> {
    // MEMO(nontangent): Initialize and publish JIT compiler facade for compiling BootStrapModule just in time.
    if (!isCompilerPublished()) await publishFacade();

    return NgModule({
      imports: [...(this.config.imports ?? [])],
      providers: [...(this.config.providers ?? []), ...extraProviders],
      jit: true,
    })(class _ implements DoBootstrap {
      // MEMO(nontangent): ApplicationRef on Angular 13.1 has no public injector.
      // TODO(nontnagent): Use ApplicationRef.injector when updating to above Angular 13.2.
      async ngDoBootstrap({_injector}: any & {_injector: Injector}) {
        const {_bootstrapComponents, injector} = createInternalNgModuleRef(moduleType, _injector);
        await defineElements(_bootstrapComponents, injector);
      }
    });;
  }

  async load(name: string, extraProviders: StaticProvider[] = []) {
    return this.resolveModule(name)
      .then(Module => this.buildBootstrapModule(Module, extraProviders))
      .then((BootstrapModule) => this.platform.bootstrapModule(BootstrapModule))
      .catch((err) => console.error(err));
  }
}

import { createNxModuleRef, Injector, NxModule } from '@nx-ddd/core';
import { Provider } from '@nx-ddd/core/di/interface/provider';

export class RootProviderService {
  private static readonly _providers: Provider[] = [];

  static register(providers: Provider[]) {
    providers.forEach(provider => this._providers.push(provider));
  }

  static clear() {
    while(this._providers.length) {
      this._providers.pop();
    }
  }

  static get providers(): Provider[] {
    return this._providers;
  }
}

export function getRootInjector(imports: any[]): Injector {
  const { injector } = createNxModuleRef(NxModule({
    imports: [...imports],
    providers: [...RootProviderService.providers],
  })(class {}));
  return injector;
}

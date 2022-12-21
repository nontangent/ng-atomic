import { Provider } from "@nx-ddd/core/di/interface/provider";

export class GlobalProvidersManager {
  private static _providers: Provider[] = [];

  static get providers(): Provider[] {
    return this._providers;
  }

  static register(providers: Provider[]) {
    this._providers = [...this._providers, ...providers];
  }
}

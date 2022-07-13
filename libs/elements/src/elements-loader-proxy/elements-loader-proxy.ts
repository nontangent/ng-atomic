import { ElementsLoaderFactory, ElementsLoaderRegistry } from "../elements-loader-registry";
import { ExtraNgModule } from "../utils";


export class ElementsLoaderProxy {
  constructor(private name: string) { }

  static registerFactory(name: string, factory: ElementsLoaderFactory): void {
    return ElementsLoaderRegistry.registerFactory(name, factory);
  }

  get _() {
    return ElementsLoaderRegistry.getInstance(this.name);
  }

  async load(key: string, selectors?: string[], extraNgModule?: ExtraNgModule): Promise<void> {
    return (await this._).load(key, selectors, extraNgModule)
  }
}

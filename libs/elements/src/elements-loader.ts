import { NgModuleRef, PlatformRef, StaticProvider, Type } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ElementsConfig, resolveConfig } from "./resolve-config";


export class ElementsLoader {
  static instance: ElementsLoader;
  resolvedMap = new Map<string, ElementsConfig>();

  register(configs: (string | ElementsConfig)[]) {
    for (const _config of configs) {
      const config = resolveConfig(_config);
      this.resolvedMap.set(config.name, config);
    }
  }

  load(name: string, providers: StaticProvider[] = []): Promise<void | NgModuleRef<unknown>> | undefined {
    return this.resolvedMap.get(name)?.bootstrap()
      .then((Module) => this.getPlatform(providers).bootstrapModule(Module))
      .catch((err) => console.error(err));
  }

  protected getPlatform(providers: StaticProvider[] = []): PlatformRef {
    return platformBrowserDynamic(providers);
  }
}

export function elementsLoaderFactory() {
  return ElementsLoader.instance ??= new ElementsLoader();
}

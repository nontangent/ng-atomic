import { Type } from '@angular/core';
import { parseName } from './parse-name';

export interface ElementsConfig<M = any> {
  name: string;
  bootstrap: () => Promise<Type<M>>;
}

export function resolveConfig(config: string | ElementsConfig): ElementsConfig {
  if (typeof config === 'string') {
    const [type, name, moduleName] = parseName(config);
    return {name: config, bootstrap: () => import(`./${type}/${name}/${name}.module`).then(m => m[moduleName])}
  } else {
    return config;
  }
}
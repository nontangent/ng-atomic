import { classify } from '@angular-devkit/core/src/utils/strings';
import { Type } from '@angular/core';

export interface ElementsConfig<M = any> {
  name: string;
  bootstrap: () => Promise<Type<M>>;
}

export function parseName(config: string): [string, string, string] {
  const [type, ...words] = config.split('-');
  const name = words.join('-');
  const moduleName = `${classify(name)}Module`;
  return [type, name, moduleName];
}

export function resolveConfig(config: string | ElementsConfig): ElementsConfig {
  if (typeof config === 'string') {
    const [type, name, moduleName] = parseName(config);
    return {name: config, bootstrap: () => import(`./${type}/${name}/${name}.module`).then(m => m[moduleName])}
  } else {
    return config;
  }
}
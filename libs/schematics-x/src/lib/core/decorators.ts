import { Injectable as _Injectable, Injector } from '@nx-ddd/core';

export function Injectable(params?: { providedIn: 'root'}) {
  return (target: any) => {
    if (params?.providedIn === 'root') {
      target.providedIn = 'root';
      const deps = Reflect.getMetadata("design:paramtypes", target) || [];
      target['Θfac'] = () => target['Θins'] ??= new target(...deps.map(dep => dep['Θfac']()));
    }
    return _Injectable()(target);
  }
}

export class RootScopedInjector extends Injector {
  get<T>(token: any) {
    if(token.providedIn === 'root') {
      return token['Θfac']();
    }
  }
}

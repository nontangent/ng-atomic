import { Inject, InjectionToken, Optional, Pipe } from '@angular/core';

export type DomainLangMap = Record<string, string>;
export const DOMAIN_LANG_MAP = new InjectionToken<DomainLangMap>('domain lang map');

@Pipe({
  name: 'D',
  pure: true,
})
export class DomainPipe {
  constructor(@Optional() @Inject(DOMAIN_LANG_MAP) private map: DomainLangMap) {
    this.map ??= {};
  }

  transform(input: string) {
    return this.map?.[input] ?? input;
  }
}


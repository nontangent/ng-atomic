import { Inject, InjectionToken, Optional, Pipe, PipeTransform } from '@angular/core';
import { smartSortByTransformer, SmartSortByTransformer } from './smart-sort-by.transformer';

export const SMART_SORT_BY_TRANSFORMER = new InjectionToken('[@ng-atomic/common] Smart Sort By Transformer');

@Pipe({
  name: 'smartSortBy',
  pure: true,
})
export class SmartSortByPipe implements PipeTransform {

  constructor(
    @Optional()
    @Inject(SMART_SORT_BY_TRANSFORMER)
    private transformer?: SmartSortByTransformer,
  ) {
    this.transformer ??= smartSortByTransformer;
  }

  transform<T>(items: T[], key: string, order: 'asc' | 'desc' = 'asc'): T[] {
    return this.transformer(items, key, order);
  }

}

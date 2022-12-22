import { Inject, InjectionToken, Optional, Pipe, PipeTransform } from '@angular/core';
import { PaginationTransformer, paginationTransformer } from './pagination.transformer';

export const PAGINATION_TRANSFORMER = new InjectionToken('[@ng-atomic/pipes] Pagination Transformer');

@Pipe({
  name: 'pagination',
  pure: true,
})
export class PaginationPipe<E> implements PipeTransform {

  constructor(
    @Optional()
    @Inject(PAGINATION_TRANSFORMER)
    private transformer: PaginationTransformer<E>,
  ) {
    this.transformer ??= paginationTransformer;
  }

  transform(items: E[], {sortKey, sortOrder, start, end}: {sortKey: string, sortOrder: 'asc' | 'desc', start: number, end: number}) {
    return this.transformer(items, { key: sortKey, order: sortOrder, start, end });
  }
}

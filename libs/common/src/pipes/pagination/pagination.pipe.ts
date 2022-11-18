import { SlicePipe } from '@angular/common';
import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { smartSortByTransformer, SmartSortByTransformer, SMART_SORT_BY_TRANSFORMER } from '@ng-atomic/common/pipes/smart-sort-by';

@Pipe({
  name: 'pagination',
  pure: true,
})
export class PaginationPipe implements PipeTransform {
  private slicePipe = new SlicePipe();

  constructor(
    @Optional()
    @Inject(SMART_SORT_BY_TRANSFORMER)
    private transformer: SmartSortByTransformer,
  ) {
    this.transformer ??= smartSortByTransformer;
  }

  transform<T>(items: T[], {sortKey, sortOrder, start, end}: {sortKey: string, sortOrder: 'asc' | 'desc', start: number, end: number}) {
    return this.slicePipe.transform(this.transformer(items, sortKey, sortOrder), start, end);
  }
}

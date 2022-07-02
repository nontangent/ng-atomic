import { SlicePipe } from '@angular/common';
import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { EntitiesPageStore } from '@ng-atomic/common/store';
import { smartSortByTransformer, SmartSortByTransformer, SMART_SORT_BY_TRANSFORMER } from '../smart-sort-by';

@Pipe({
  name: 'smartClamp',
  pure: false,
})
export class SmartClampPipe implements PipeTransform {
  private slicePipe = new SlicePipe();
  private _input: any = null;
  private _output: any = [];

  constructor(
    @Optional()
    @Inject(SMART_SORT_BY_TRANSFORMER)
    private transformer: SmartSortByTransformer,
  ) {
    this.transformer ??= smartSortByTransformer;
  }

  transform<T>(items: T[], store: EntitiesPageStore<any, any>): T[] {
    const input = {
      items, 
      sortKey: store.sortKey, 
      sortOrder: store.sortOrder, 
      start: store.page.start,
      end: store.page.end,
    };
    
    if (JSON.stringify(input) === JSON.stringify(this._input)) {
      return this._output;
    }

    this._input = input;
    items = this.transformer(items, store?.sortKey, store?.sortOrder as 'asc' | 'desc');
    items = this.slicePipe.transform(items, store.page.start, store.page.end);
    return this._output = items;
  }
}

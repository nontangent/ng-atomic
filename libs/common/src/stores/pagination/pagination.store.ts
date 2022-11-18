import { ComponentStore } from "@ngrx/component-store";
import { Page } from '@ng-atomic/common/utils/page';
import { Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";

export interface EntitiesState<E> {
  page: Page;
}

@Injectable()
export class PaginationStore extends ComponentStore<any> {
  get page() { return this.get(state => state.page); }
  get sortKey() { return this.page.sortKey; }
  get sortOrder() { return this.page.sortOrder; }

  setPage = this.updater((state, page: Page) => ({...state, page}));
  setSortKey = this.updater((state, sortKey: string) => ({...state, page: this.page.patch({sortKey})}));
  setSortOrder = this.updater((state, sortOrder: 'asc' | 'desc') => ({...state, page: this.page.patch({sortOrder})}));

  getPageLength = this.effect((entities$: Observable<any[]>) => entities$.pipe(
    tap(({length}: any[]) => this.setPage(this.page.patch({length}))),
  ));

  changeSortFromEvent(name: string) {
    if (name === this.sortKey) {
      const order = this.sortOrder === 'asc' ? 'desc' : 'asc';
      this.setSortOrder(order);
    } else {
      this.setSortKey(name);
      this.setSortOrder('asc');
    }
  }
}

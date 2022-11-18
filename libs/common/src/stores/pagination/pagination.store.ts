import { ComponentStore } from "@ngrx/component-store";
import { Page } from '@ng-atomic/common/utils/page';
import { Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";

export interface EntitiesState<E> {
  page: Page;
}

@Injectable()
export class PaginationStore extends ComponentStore<any> {
  constructor() {super({page: Page.from()})}

  get page() { return this.get(state => state.page); }
  get sortKey() { return this.page.sortKey; }
  get sortOrder() { return this.page.sortOrder; }
  get start() { return this.page.start; }
  get end() { return this.page.end; }

  setPage = this.updater((state, page: Page) => ({...state, page}));
  setSortKey = this.updater((state, sortKey: string) => ({...state, page: this.page.patch({sortKey})}));
  setSortOrder = this.updater((state, sortOrder: 'asc' | 'desc') => ({...state, page: this.page.patch({sortOrder})}));
  patch = this.updater((state, page: Partial<Page>) => ({...state, page: state.page.patch(page)}));
 
  getPageLength = this.effect((entities$: Observable<any[]>) => entities$.pipe(
    tap(({length}: any[]) => this.setPage(this.page.patch({length}))),
  ));

  changeSortFromEvent(sortKey: string, page: Page = this.page) {
    const reverse = (order: 'asc' | 'desc') => order === 'asc' ? 'desc' : 'asc';
    const sortOrder = sortKey === page.sortKey ? reverse(page.sortOrder) : 'asc';
    this.patch({sortKey, sortOrder});
  }

}

import { ComponentStore } from "@ngrx/component-store";
import { Page } from '@ng-atomic/common/utils/page';
import { Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";

export interface State {
  page: Page;
}

@Injectable()
export class PaginationStore extends ComponentStore<State> {
  constructor() {super({page: Page.from()})}

  get page() { return this.get(state => state.page); }
  get start() { return this.page.start; }
  get end() { return this.page.end; }

  page$ = this.select(state => state.page);

  setPage = this.updater((state, page: Page) => ({...state, page}));
  patch = this.updater((state, page: Partial<Page>) => ({...state, page: state.page.patch(page)}));
 
  getPageLength = this.effect((entities$: Observable<any[]>) => entities$.pipe(
    tap(({length}: any[]) => this.setPage(this.page.patch({length}))),
  ));
}

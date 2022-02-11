import { ComponentStore } from '@ngrx/component-store';
import { LoadingService } from '@ng-atomic/common/services';
// import { Page } from '../components/templates/smart-index';
import { filterByQuery } from '@ng-atomic/common/utils';
import { compareById } from '@ng-atomic/common/utils';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap, map, filter, switchMap } from 'rxjs/operators';

export type Page = any

export interface EntitiesPageState<E> {
  userId: string; 
  idSet: Set<string>;
  query: string;
  entities: E[]
  page: Page;
}

export abstract class EntitiesPageStore<S extends EntitiesPageState<E>, E extends {id: string}> extends ComponentStore<S> {
  abstract LANG_MAP: Record<string, string>;

  get page(): Page { return this.get(state => state.page); }
  get idSet(): Set<string> { return this.get(state => state.idSet); }

  userId$ = this.select(state => state.userId).pipe(filter(userId => !!userId));
  entities$ = this.select(({query, entities}) => filterByQuery(entities, query, this.LANG_MAP))
    .pipe(map((entities: E[]) => entities.sort(compareById)))
    .pipe(distinctUntilChanged((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur)));

  constructor(initialState: S) {
    super(initialState);
    this.getPage(this.entities$);
    this.getEntities(this.userId$);
  }

  setUserId = this.updater((state, userId: string) => ({...state, userId}));
  setEntities = this.updater((state, entities: E[]) => ({...state, entities}));
  setPage = this.updater((state, page: Page) => ({...state, page}));
  setIdSet = this.updater((state, idSet: Set<string>) => ({...state, idSet}));
  addId = this.updater((state, id: string) => ({...state, idSet: new Set([...state.idSet, id])}));
  removeId = this.updater((state, id: string) => {
    return {...state, idSet: new Set([...state.idSet].filter(_id => _id !== id))}
  });
  setQuery = this.updater((state, query: string) => ({...state, query}));

  getPage = this.effect((entities$: Observable<E[]>) => entities$.pipe(
    tap(({length}: E[]) => this.setPage(this.page.patch({length}))),
  ));

  getEntities = this.effect((userId$: Observable<string>) => userId$.pipe(
    filter(userId => !!userId),
    tap(() => this.loading.setKey('[/entities] Get Entities')),
    switchMap(() => this._getEntities()),
    tap((entities: E[]) => this.setEntities(entities)),
    tap(() => this.loading.removeKey('[/entities] Get Entities')),
  )); 

  abstract _getEntities(): Observable<E[]>;
  abstract loading: LoadingService;
}
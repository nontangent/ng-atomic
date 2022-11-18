import { ComponentStore } from '@ngrx/component-store';
import { QueryResolverService } from '@ng-atomic/common/services/query-resolver';
import { compareById } from '@ng-atomic/common/utils';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap, map, filter, switchMap } from 'rxjs/operators';

export interface EntitiesState<E> {
  userId: string; 
  idSet: Set<string>;
  query: string;
  entities: E[]
}

export const distinctUntilChangedArray = <T>() => {
  return distinctUntilChanged<T>((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur));
};

export abstract class EntitiesStore<S extends EntitiesState<E>, E extends {id: string}> extends ComponentStore<S> {
  abstract LANG_MAP: Record<string, string>;

  get idSet(): Set<string> { return this.get(state => state.idSet); }

  userId$ = this.select(state => state.userId).pipe(filter(userId => !!userId));
  entities$ = this.select(({query, entities}) => this.queryResolver.resolve(entities, query, this.LANG_MAP))
    .pipe(map((entities: E[]) => entities.sort(compareById)))
    .pipe(distinctUntilChanged((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur)));

  constructor(
    initialState: S,
    public queryResolver = new QueryResolverService(),
  ) {
    super(initialState);
    this.getEntities(this.userId$);
  }

  setUserId = this.updater((state, userId: string) => ({...state, userId}));
  setEntities = this.updater((state, entities: E[]) => ({...state, entities}));
  setIdSet = this.updater((state, idSet: Set<string>) => ({...state, idSet}));
  addId = this.updater((state, id: string) => ({...state, idSet: new Set([...state.idSet, id])}));
  removeId = this.updater((state, id: string) => {
    return {...state, idSet: new Set([...state.idSet].filter(_id => _id !== id))}
  });
  setQuery = this.updater((state, query: string) => ({...state, query}));

  getEntities = this.effect((userId$: Observable<string>) => userId$.pipe(
    filter(userId => !!userId),
    switchMap((userId) => this._getEntities({userId})),
    tap((entities: E[]) => this.setEntities(entities)),
  )); 

  abstract _getEntities(data?: object): Observable<E[]>;
}
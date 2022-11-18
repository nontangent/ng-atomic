import { ComponentStore } from '@ngrx/component-store';
import { compareById } from '@ng-atomic/common/utils';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap, filter, switchMap } from 'rxjs/operators';

export interface EntitiesState<E> {
  userId: string; 
  entities: E[]
}

export const distinctUntilChangedArray = <T>() => {
  return distinctUntilChanged<T>((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur));
};

export abstract class EntitiesStore<S extends EntitiesState<E>, E extends {id: string}> extends ComponentStore<S> {
  get entities() { return this.get().entities; }

  userId$ = this.select(state => state.userId).pipe(filter(userId => !!userId));
  entities$ = this.select(({entities}) => entities ? entities.sort(compareById) : []);
  
  constructor(initialState: S) {
    super(initialState);
    this.getEntities(this.userId$);
  }

  setUserId = this.updater((state, userId: string) => ({...state, userId}));
  setEntities = this.updater((state, entities: E[]) => ({...state, entities}));

  getEntities = this.effect((userId$: Observable<string>) => userId$.pipe(
    filter(userId => !!userId),
    switchMap((userId) => this._getEntities({userId})),
    tap((entities: E[]) => this.setEntities(entities)),
  )); 

  abstract _getEntities(data?: object): Observable<E[]>;
}
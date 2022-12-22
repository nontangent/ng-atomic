import { ComponentStore } from '@ngrx/component-store';
import { compareById } from '@ng-atomic/common/utils';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, tap, filter, switchMap } from 'rxjs/operators';

export interface EntitiesState<E> {
  entities: E[]
}

export const distinctUntilChangedArray = <T>() => {
  return distinctUntilChanged<T>((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur));
};

export abstract class EntitiesStore<S extends EntitiesState<E>, E extends {id: string}> extends ComponentStore<S> {
  protected readonly refresh$ = new ReplaySubject<void>(1);

  get entities() { return this.get().entities; }

  entities$ = this.select(({entities}) => entities ? entities.sort(compareById) : []);
  
  constructor(initialState: S) {
    super(initialState);
    this.refresh();
  }

  setEntities = this.updater((state, entities: E[]) => ({...state, entities}));

  abstract getEntities: ReturnType<typeof this.effect>;

  refresh() {
    this.refresh$.next();
  }
}
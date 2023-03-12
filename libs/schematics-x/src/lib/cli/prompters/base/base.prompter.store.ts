import { Injectable } from '@nx-ddd/core';
import { logger } from '../../../cli/logger';
import { catchError, isObservable, map, Observable, of, ReplaySubject, Subject, Subscription, take, takeUntil, withLatestFrom } from 'rxjs';

type ReturnType<V> = (observableOrValue: V | Observable<V>) => Subscription;

const $ = <T>(valueOrObservable: T | Observable<T>) => {
  return isObservable(valueOrObservable) ? valueOrObservable : of(valueOrObservable);
}

@Injectable()
export class PrompterStore<T extends object> {
  readonly destroy$ = new ReplaySubject<void>(1);
  readonly state$ = new ReplaySubject<T>(1);

  constructor(state: T) {
    this.state$.next(state);
  }

  select<R>(projector: (state: T) => R): Observable<R> {
    return this.state$.pipe(map(projector));
  }

  get state(): T {
    let value: T;
    this.state$.pipe(take(1)).subscribe((state) => value = state);
    return value!;
  }

  updater<V>(updaterFn: (state: T, value: V) => T): ReturnType<V> {
    return (valueOrObservable: V | Observable<V>) => {
      return $(valueOrObservable).pipe(
        withLatestFrom(this.state$),
        map(([value, state]) => updaterFn(state, value)),
        takeUntil(this.destroy$),
      ).subscribe((state) => this.state$.next(state));
    };
  }

  patchState(patchedState: Partial<T>): void {
    this.updater((state, partialState: Partial<T>) => ({
      ...state, ...partialState,
    }))(patchedState);
  }

  effect<V>(generator: (origin$: Observable<V>) => Observable<unknown>): ReturnType<V> {
    const origin$ = new Subject<V>();
    origin$.pipe(
      generator,
      takeUntil(this.destroy$)
    ).subscribe();

    return ((
      valueOrObservable?: V | Observable<V>
    ): Subscription => {
      return $(valueOrObservable)
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => origin$.next(value as V));
    }) as unknown as ReturnType<V>;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, map, distinctUntilChanged, delay } from 'rxjs/operators';

type LoadingMap = Record<string, boolean>;

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingEntries$ = new Subject<[string, boolean]>();

  loadingMap: LoadingMap = {};
  loadingMap$ = this.loadingEntries$.pipe(
    scan((pre, [key, value]) => ({ ...pre, [key]: value }), {} as LoadingMap),
    map((m: LoadingMap) => Object.entries(m)
      .filter(([k, v]: [string, boolean]) => v)
      .reduce((p, [k, v]) => ({ ...p, [k]: v }), {} as LoadingMap)),
    distinctUntilChanged((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur)),
  );

  isLoading$ = this.loadingMap$.pipe(
    map((m) => !!Object.keys(m).length),
    delay(0),
  );

  constructor() {
    this.loadingMap$.subscribe((m) => {
      this.loadingMap = m;
    });
  }

  setKey(key: string): void {
    this.loadingEntries$.next([key, true]);
  }

  removeKey(key: string): void {
    this.loadingEntries$.next([key, false]);
  }

  start(callback: (done: any) => void, key: string = randomStr(16)) {
    this.setKey(key);
    callback(() => this.removeKey(key));
  }
}

export function randomStr(n: number = 16): string {
  return Math.random().toString(36).substr(2, n);
}
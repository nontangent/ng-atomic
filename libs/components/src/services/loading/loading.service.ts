import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan, map, distinctUntilChanged, delay } from 'rxjs/operators';

type LoadingMap = Record<string, boolean>;

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingEntries$ = new Subject<[string, boolean]>();

  loadingMap: LoadingMap = {};
  loadingMap$: Observable<LoadingMap> = this.loadingEntries$.pipe(
    scan((pre, [key, value]) => ({ ...pre, [key]: value }), {} as LoadingMap),
    map((m: LoadingMap) => {
      return (
        Object.entries(m)
          // loadingがfalseになったkeyを削除
          .filter(([k, v]: [string, boolean]) => v)
          // 重複したkeyを削除
          .reduce((p, [k, v]) => ({ ...p, [k]: v }), {} as LoadingMap)
      );
    }),
    distinctUntilChanged((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur)),
  );

  isLoading$: Observable<boolean> = this.loadingMap$.pipe(
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
}

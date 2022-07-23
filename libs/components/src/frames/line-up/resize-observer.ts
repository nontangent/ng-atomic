import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import ResizeObserver from 'resize-observer-polyfill';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ElementRef } from '@angular/core';

export function fromResize({nativeElement}: ElementRef<Element>): Observable<number> {
  return Observable.create(function(observer: any) {
    const callback = (entries: any) => entries.forEach((e: any) => observer.next(e));
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(nativeElement);
    return () => resizeObserver.disconnect();
  }).pipe(
    map(({contentRect}) => contentRect?.width ?? 0),
    startWith(0),
    distinctUntilChanged(),
  );
}

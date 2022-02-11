import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import ResizeObserver from 'resize-observer-polyfill';

export interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
}

export function fromResize(...elements: Element[]): Observable<ResizeObserverEntry> {
  return Observable.create(function(observer: any) {

    const resizeObserver = new ResizeObserver((observerEntries: any) => {
      for (const entry of observerEntries) {
        observer.next(entry);
      }
    });

    for (const el of elements) {
      resizeObserver.observe(el);
    }

    // cancel resize observer on cancelation
    return () => resizeObserver.disconnect();
  }).pipe(
   startWith({
     x: 0,
     y: 0,
     width: 0,
     height: 0,
     top: 0,
     right: 0,
     bottom: 0,
     left: 0,
   }) 
  );
}

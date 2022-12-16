import { map, ReplaySubject, scan } from "rxjs";

class Logger {
  private readonly _debug$ = new ReplaySubject<string>(1);
  debugs$ = this._debug$.asObservable().pipe(
    scan((acc, cur) => [...acc, cur], []),
  );

  debug(...args: any[]) {
    const message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
    this._debug$.next(message);
  }
}

export const logger = new Logger();
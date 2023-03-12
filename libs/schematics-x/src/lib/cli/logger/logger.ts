import { Injectable } from "@nx-ddd/core";
import { ReplaySubject, scan } from "rxjs";
import fs from 'fs';

@Injectable()
export class Logger {
  constructor() {
    console['_stdout'] = fs.createWriteStream('/dev/null');
    console['_stderr'] = fs.createWriteStream('/dev/null');
  }

  private readonly _debug$ = new ReplaySubject<string>(1);
  debugs$ = this._debug$.asObservable().pipe(
    scan((acc, cur) => [...acc, cur], []),
  );

  debug(...args: any[]) {
    // const message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
    // this._debug$.next(message);
    console.debug(...args);
  }

  error(...args: any[]) {
    console.error(...args);
  }
}

export const logger = new Logger();

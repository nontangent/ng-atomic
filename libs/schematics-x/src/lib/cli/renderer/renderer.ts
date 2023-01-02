import { Inject, Injectable, InjectionToken } from "@nx-ddd/core";
import ScreenManager from "inquirer/lib/utils/screen-manager";
import { Interface } from "readline";
import { CursorShifter } from "../utils/cursor-shifter";
import { Logger } from '../logger';
import chalk  from 'chalk';
import { combineLatest, debounceTime, ReplaySubject, startWith } from "rxjs";

export class SxScreen {
  constructor(
    protected rl: Interface,
    protected cs: CursorShifter,
    protected screen: ScreenManager
  ) { }
  
  get line() {
    return this.rl.line;
  }

  get cursor(): Cursor {
    return this.cs.getCursorPos();
  }

  setShift(cursor: Cursor) {
    this.cs.setShift(cursor);
  }

  clearLine(): void {
    (this.rl as any).clearLine();
  }

  write(prompt: string) {
    this.rl.write(prompt);
  }

  render(content: string, bottomContent: string): void {
    this.screen.render(content, bottomContent);
  }

  pause() {
    this.rl.pause();
  }

  resume() {
    this.rl.resume();
  }

}

export interface Cursor {
  cols: number;
  rows: number;
}

function getScreenSize() {
  const {rows, columns} = process.stdout;
  return {rows, columns};
}

export const SX_SCREEN = new InjectionToken('[schematics-x] Screen');

@Injectable()
export class Renderer {
  content$ = new ReplaySubject<string>(1);
  bottomContent$ = new ReplaySubject<string>(1);

  constructor(
    @Inject(SX_SCREEN) protected screen: SxScreen,
    protected logger: Logger,
  ) {
    combineLatest({
      content: this.content$,
      bottomContent: this.bottomContent$,
      debugs: logger.debugs$.pipe(startWith([])),
    }).pipe(
      debounceTime(30),
    ).subscribe(({content, bottomContent, debugs}) => {
      // const debugContent = debugs.length;
      let debugContent = `\n${chalk.bgBlack('============= LOGGING =============')}\n`
      debugContent += debugs.slice(-4).map(debug => `${chalk.bgGray('[DEBUG]')} ${debug}`.slice(0, 100)).join('\n');

      const { rows, columns } = getScreenSize();
      // const pad = rows - content.split('\n').length - bottomContent.split('\n').length - debugContent.split('\n').length - 1;

      this.screen.render(content, bottomContent + debugContent);
    });
  }

  get readline(): string {
    return this.screen.line;
  }

  get cursor (): Cursor {
    return this.screen.cursor;
  }

  setShift({cols, rows}: Cursor) {
    this.screen.setShift({cols: cols - this.cursor.cols, rows: rows - this.cursor.rows});
  }

  render({content, bottomContent}: {
    content: string,
    bottomContent: string
  }): void {
    this.content$.next(content);
    this.bottomContent$.next(bottomContent);
  };

  clearLine(): void {
    this.screen.clearLine();
  }

  write(prompt: string) {
    this.screen.write(prompt);
  }
}
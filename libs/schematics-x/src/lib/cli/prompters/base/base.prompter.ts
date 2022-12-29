import 'core-js/features/string/replace-all';
import observe from 'inquirer/lib/utils/events';
import { filter, map, Observable, ReplaySubject, shareReplay, take, takeUntil } from 'rxjs';
import { logger } from '../../logger';
import { CursorShifter } from './cursor-shifter';
import ScreenManager from 'inquirer/lib/utils/screen-manager';
import { Interface } from 'readline';
import { visibleSC } from '../../utils';

export type Status = 'answered' | 'pending';

export interface Cursor {
  cols: number;
  rows: number;
}

export interface Proxy {
  done: any;
  rl: Interface;
  cs: CursorShifter;
  screen: ScreenManager;
  handleSubmitEvents: (...args: any[]) => {
    success: Observable<{value: string}>;
    error: any;
  };
}

export abstract class BasePrompter {
  private events = observe(this.proxy.rl);
  private keypress$ = this.events.keypress.pipe(shareReplay());
  protected validation = this.proxy.handleSubmitEvents(this.events.line.pipe(map(line => line ?? '')))
  protected validateSuccess$ = this.validation.success;
  protected validateFailure$ = this.validation.error;

  protected prompt$ = new ReplaySubject<string>(1);
  protected answer$ = this.validateSuccess$.pipe(map(state => state.value));
  protected status$: Observable<Status> = this.validateSuccess$.pipe(map(() => 'answered'));
  protected destroy$ = this.status$.pipe(filter(status => status !== 'pending'), take(1));

  get readline(): string {
    return this.proxy.rl.line;
  }

  get cursor (): Cursor {
    return this.proxy.cs.getCursorPos();
  }

  constructor(protected proxy: Proxy) { }

  sxOnInit(): void {
    this.keypress$.pipe(
      // takeUntil(this.events.line),
      takeUntil(this.validateSuccess$)
    ).subscribe(({key}) => {
      logger.debug('key:', key.name);
      switch(key.name) {
        case 'tab': return this.onTabKeyPress();
        case 'up': return this.onUpKeyPress();
        case 'down': return this.onDownKeyPress();
        case 'left': break;
        case 'right': break;
        default: {
          return this.onKeyPress();
        }
      }
    });
    this.answer$.subscribe((answer) => this.onAnswer(answer));
    // this.validateFailure$.subscribe((state) => {
    //   this.render();
    // });
  };

  sxOnDestroy(state: any): void {
    this.proxy.screen.done();
  };

  protected write(_prompt: string, clearLine = false) {
    const prompt = _prompt.replaceAll('\t', '');
    if (clearLine) {
      (this.proxy.rl as any).clearLine();
      this.proxy.rl.write(prompt);
    }
    this.prompt$.next(prompt);
    logger.debug('prompt:', visibleSC(prompt), this.proxy.rl.cursor);
  }

  protected abstract onTabKeyPress();
  protected abstract onUpKeyPress();
  protected abstract onDownKeyPress();
  protected abstract onKeyPress();

  onAnswer(answer: string) {
    this.proxy.done(answer);
  }

  protected render({content, bottomContent, cursor}: {
    content: string,
    bottomContent: string,
    cursor: Cursor,
  }): void {
    this.proxy.cs.setShift(cursor.cols - this.cursor.cols);
    this.proxy.screen.render(content, bottomContent);
  };
}


import Base from 'inquirer/lib/prompts/base';
import observe from 'inquirer/lib/utils/events';
import { catchError, combineLatest, distinctUntilChanged, map, of, ReplaySubject, shareReplay, startWith, switchMap, takeUntil } from 'rxjs';
import ScreenManager from 'inquirer/lib/utils/screen-manager';
import { Interface } from 'readline';
import { CursorShifter } from '../screen-manager';
import { Suggester } from '../suggester';
import { logger } from '../logger';
import { Renderer } from '../renderers';
import chalk from 'chalk';

const visible = (str: string) => {
  return str
    // .replaceAll(' ', '<SPACE>')
    // .replaceAll('\s', '\\s')
    .replaceAll('\t', '\\t')
    .replaceAll('\n', '\\n')
    .replaceAll('\r', '\\r');
};

type Status = 'answered' | 'pending';

export class Prompt extends Base {
  opt: any;
  done: any;
  answer: any;

  private events = observe(this.rl);
  private keypress$ = this.events.keypress.pipe(shareReplay());
  private validation = this.handleSubmitEvents(this.events.line.pipe(map(line => line ?? '')))
  private validateSuccess$ = this.validation.success;
  private validateFailure$ = this.validation.error;

  private answer$ = this.validateSuccess$.pipe(map(state => state.value));
  private status$ = this.validateSuccess$.pipe(map(() => 'answered' as Status));

  prompt: string = '';
  prompt$ = new ReplaySubject<string>(1);

  suggestIndex$ = new ReplaySubject<number>(1);

  suggest: string = '';
  suggest$ = this.prompt$.pipe(
    switchMap((prompt) => this.suggester.suggest(prompt).pipe(
      catchError(error => {
        logger.debug(error);
        return of('');
      })
    )),
  );

  private suggester = new Suggester();
  protected cs: CursorShifter;


  constructor(questions, rl: Interface, answers) {
    super(questions, rl, answers);
    this.cs = new CursorShifter(this.rl);
    this.screen = new ScreenManager(this.cs as never as Interface);
    this.prompt$.subscribe(prompt => this.prompt = prompt);
    this.suggest$.subscribe(suggest => this.suggest = suggest);

    combineLatest({
      prompt: this.prompt$.pipe(startWith('')),
      debugs: logger.debugs$.pipe(startWith([])),
      suggest: this.suggest$.pipe(startWith('')),
      status: this.status$.pipe(startWith<Status>('pending')),
      answer: this.answer$.pipe(startWith('')),
    }).pipe(
      distinctUntilChanged((cur, pre) => JSON.stringify(cur) === JSON.stringify(pre)),
    ).subscribe((data) => this.render(data));
  }

  write(_prompt: string) {
    const prompt = _prompt.replaceAll('\t', '');
    this.rl.write(null, { ctrl: true, name: 'u' });
    logger.debug('prompt:', visible(prompt));
    this.rl.write(prompt)
    this.prompt$.next(prompt);
  }

  onTabKeyPress() {
    const completed = this.prompt + this.suggest;
    logger.debug('completed:', visible(completed));
    this.write(completed);
  }

  onUpKeyPress() {
    this.suggester.prev();
  }

  onKeyPress() {
    this.write(this.rl.line);
  }

  onAnswer(answer: string) {
    this.status = 'answered';
    // this.render();
    this.screen.done();
    this.done(answer);
  }

  _run(callback: any) {
    this.done = callback;

    this.keypress$.pipe(
      // takeUntil(this.events.line),
      takeUntil(this.validateSuccess$)
    ).subscribe(({key}) => {
      logger.debug('key detected! =>', key.name);
      switch(key.name) {
        case 'tab': return this.onTabKeyPress();
        case 'up': return this.onUpKeyPress();
        case 'down': return this.suggester.next();
        case 'left': break;
        case 'right': break;
        default: return this.onKeyPress();
      }
    });
    this.answer$.subscribe((answer) => this.onAnswer(answer));
    // this.validateFailure$.subscribe((state) => {
    //   this.render();
    // });

    return this;
  }

  protected render({prompt, suggest, debugs, status, answer}: Data) {
    const renderer = new Renderer();
    const message = renderer.buildMessage({prompt, suggest, status, answer});
    this.cs.setShift(-suggest.length);
    const DEBUG_MESSAGE = `(${this.cs.getCursorPos().cols}, ${this.cs.getCursorPos().rows})\n`;
    const pad = (arr: any[], n: number) => {
      while(arr.length < n) { arr.push(''); }
      return arr;
    };

    const DEBUG_MESSAGES = pad(debugs, 5).slice(-5).map(debug => `${chalk.white.bgGray('[DEBUG]')}: ${debug.slice(0, 100)}`).join('\n');
    this.screen.render(`${message}`, true ? '' : '\n' + DEBUG_MESSAGE + DEBUG_MESSAGES);
  }
}

interface Data {
  prompt: string;
  suggest: string;
  debugs: string[];
  status: Status;
  answer: string;
}
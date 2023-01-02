import Base from 'inquirer/lib/prompts/base';
import observe from 'inquirer/lib/utils/events';
import ScreenManager from 'inquirer/lib/utils/screen-manager';
import { Interface } from 'readline';
import { map, Observable, ReplaySubject, shareReplay, switchMap, take, takeUntil } from 'rxjs';
import { KeyEventHandler, KEY_EVENT_HANDLER} from '../../core';
import { Prompter } from '../../prompters';
import { SxScreen } from '../../renderer/renderer';
import { CursorShifter } from '../../utils/cursor-shifter';


export function InquirerAdapter(prompterFactory: (sxScreen: SxScreen) => Prompter): { new(...args: any[]) } {
  return class extends Base {
    protected cs = new CursorShifter(this.rl);
    protected screen = new ScreenManager(this.cs as never as Interface);
    private events = observe(this.rl);
    private keypress$ = this.events.keypress.pipe(shareReplay(1));
    private line$ = this.events.line;
    protected validation = this.handleSubmitEvents(this.line$.pipe(map(line => line ?? '')))
    protected validateSuccess$ = this.validation.success;
    protected validateFailure$ = this.validation.error;
    protected prompt$ = new ReplaySubject<string>(1);
    protected answer$ = this.validateSuccess$.pipe(map(state => state.value));
    protected destroy$ = new ReplaySubject<void>(1);

    protected prompter: Prompter;
    protected callback: any;

    _run(callback: any) {
      this.callback = callback;
      this.onInit();
      return this;
    }

    protected onInit() {
      const sxScreen = new SxScreen(this.rl, this.cs, this.screen);
      this.prompter = prompterFactory(sxScreen);
      this.prompter.sxOnInit();

      this.answer$.pipe(
        takeUntil(this.destroy$),
        take(1),
      ).subscribe((answer) => {
        this.onAnswered(answer).then(() => this.onDestroy());
      });

      this.prompt$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(prompt => this.prompter.sxOnPrompt(prompt));

      this.keypress$.pipe(
        takeUntil(this.destroy$),
        // takeUntil(this.events.line),
        takeUntil(this.validateSuccess$)
      ).subscribe(({key}) => {
        this.prompt$.next(this.rl.line);
        const handler = this.prompter[KEY_EVENT_HANDLER] as KeyEventHandler;
        handler.handle(this.prompter, key);
      });
    }

    protected async onAnswered(answer: any) {
      await this.prompter.sxOnAnswer(answer);
      await this.callback(answer);
    }

    protected async onDestroy() {
      this.destroy$.next();
      await this.prompter.sxOnDestroy();
      this.screen.done();
      this.prompter.sxOnDestroy();
    }

  }
}

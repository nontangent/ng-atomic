import { prompt, registerPrompt } from 'inquirer';
import Base from 'inquirer/lib/prompts/base';
import observe from 'inquirer/lib/utils/events';
import ScreenManager from 'inquirer/lib/utils/screen-manager';
import { Interface } from 'readline';
import { filter, map, Observable, ReplaySubject, shareReplay, take, takeUntil } from 'rxjs';
import { Prompter } from '../../prompter';
import { Proxy, SxScreen } from '../../renderer/renderer';
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
    protected status$: Observable<any> = this.validateSuccess$.pipe(map(() => 'answered'));
    protected destroy$ = this.status$.pipe(filter(status => status !== 'pending'), take(1));

    prompter: Prompter;

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
      this.answer$.subscribe(answer => this.onAnswered(answer));
      this.prompt$.subscribe(prompt => this.prompter.sxOnPrompt(prompt));
      this.keypress$.pipe(
        // takeUntil(this.events.line),
        takeUntil(this.validateSuccess$)
      ).subscribe(({key}) => {
        // logger.debug('key:', key.name);
        switch(key.name) {
          // case 'tab': return this.onTabKeyPress();
          // case 'up': return this.onUpKeyPress();
          // case 'down': return this.onDownKeyPress();
          // case 'left': break;
          // case 'right': break;
          default: {
            this.prompt$.next(this.rl.line);
            return this.prompter.sxOnKeyPress();
          }
        }
      });
    }

    protected async onAnswered(answer: any) {
      await this.prompter.sxOnAnswer(answer);
      await this.callback(answer);
      await this.prompter.sxOnDestroy();
    }

    protected onDestroy() {
      this.screen.done();
      this.prompter.sxOnDestroy();
    }

  }
}

// async function main() {
//   class TestPrompter extends Prompter {
//     protected onDownKeyPress() { }
//     protected onUpKeyPress() { }
//     protected onTabKeyPress() { }
//     protected onKeyPress() { }
//   }

//   const adapter = InquirerAdapter((proxy) => new TestPrompter(proxy))
//   registerPrompt('test01', adapter);
//   const {result} = await prompt({ type: 'test01' as any, name: 'result', message: '>' });
//   console.debug('result:', result);
//   process.exit()
// }

// if (require.main === module) {
//   main();
// }
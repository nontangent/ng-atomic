import 'core-js/features/string/replace-all';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Inject, Injectable, InjectionToken } from '@nx-ddd/core';
import { Renderer, SxScreen } from '../renderer';

export const SX_PATH = new InjectionToken('[schematics-x] Path');
export const PROMPTER_PROXY = new InjectionToken('[schematics-x] Prompter Proxy');

export type Status = 'answered' | 'pending';

@Injectable()
export class Prompter {
  protected readonly destroy$ = new ReplaySubject<void>(1);
  protected prompt$ = new ReplaySubject<string>(1);
  protected renderer = new Renderer(this.screen);

  constructor(
    @Inject(PROMPTER_PROXY) protected screen: SxScreen
  ) { }

  sxOnInit(): void {
    this.prompt$.pipe(takeUntil(this.destroy$)).subscribe(prompt => {
      this.renderer.render({
        content: prompt,
        bottomContent: 'bottomContent',
      });
    });
  };

  sxOnPrompt(prompt: string) {
    this.prompt$.next(prompt);
  }

  sxOnKeyPress() {
    // this.renderer.render({
    //   content: 'test',
    //   bottomContent: 'bottomContent',
    //   cursor: {cols: 0, rows: 0},
    // });
  };

  sxOnAnswer(answer) {
    console.debug('answer:', answer);
  }

  sxOnDestroy(): void {
    this.destroy$.next();
  };

  protected write(_prompt: string, clearLine = false) {
    const prompt = _prompt.replaceAll('\t', '');
    if (clearLine) {
      this.renderer.clearLine();
      this.renderer.write(prompt);
    }
    // logger.debug('prompt:', visibleSC(prompt), this.proxy.rl.cursor);
  }
}

@Injectable()
export class PrompterFactory {

  create(screen: SxScreen): Prompter {
    return new Prompter(screen);
  }
}
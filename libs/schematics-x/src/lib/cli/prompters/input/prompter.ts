import 'core-js/features/string/replace-all';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Injectable, InjectionToken } from '@nx-ddd/core';
import { Presenter } from './presenter';
import { PrompterStore } from './prompter.store';
import { KeyBinding } from '../../core';

export const SX_PATH = new InjectionToken('[schematics-x] Path');
export const PROMPTER_PROXY = new InjectionToken('[schematics-x] Prompter Proxy');

@Injectable()
export class Prompter {
  protected readonly destroy$ = new ReplaySubject<void>(1);

  constructor(
    protected presenter: Presenter,
    protected store: PrompterStore,
  ) { }

  sxOnInit(): void {
    this.store.state$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(state => this.presenter.presence(state));
  };

  sxOnPrompt(prompt: string) {
    this.store.setPrompt(prompt);
  }

  sxOnAnswer(answer) {
    this.store.setAnswer(answer);
  }

  sxOnDestroy(): void {
    this.destroy$.next();
  };

  @KeyBinding({name: 'tab'})
  onTabKey() {
    // console.debug('tab key is pressed');
  }

  @KeyBinding()
  onKeyPress() {

  };

  // protected write(_prompt: string, clearLine = false) {
  //   const prompt = _prompt.replaceAll('\t', '');
  //   if (clearLine) {
  //     this.renderer.clearLine();
  //     this.renderer.write(prompt);
  //   }
  //   // logger.debug('prompt:', visibleSC(prompt), this.proxy.rl.cursor);
  // }
}

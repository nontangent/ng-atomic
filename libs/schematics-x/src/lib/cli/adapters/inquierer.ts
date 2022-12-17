import Base from 'inquirer/lib/prompts/base';
import ScreenManager from 'inquirer/lib/utils/screen-manager';
import { Interface } from 'readline';
import { BasePrompter, Proxy } from '../prompters';
import { CursorShifter } from '../screen-manager';


export function AdaptInquirer(prompterFactory: (proxy: Proxy) => BasePrompter): { new(...args: any[]) } {
  return class extends Base {
    protected cs = new CursorShifter(this.rl);
    protected screen = new ScreenManager(this.cs as never as Interface);

    _run(callback: any) {
      const prompter = prompterFactory({
        done: (...args: any[]) => callback(...args),
        rl: this.rl,
        cs: this.cs,
        screen: this.screen,
        handleSubmitEvents: this.handleSubmitEvents.bind(this),
      });
      prompter.sxOnInit();
      return this;
    }
  }
}

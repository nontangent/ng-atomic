import { prompt, registerPrompt } from 'inquirer';
import Base from 'inquirer/lib/prompts/base';
import ScreenManager from 'inquirer/lib/utils/screen-manager';
import { Interface } from 'readline';
import { BasePrompter, Proxy } from '../../prompters';
import { CursorShifter } from '../../prompters';


export function InquirerAdapter(prompterFactory: (proxy: Proxy) => BasePrompter): { new(...args: any[]) } {
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

async function main() {
  class TestPrompter extends BasePrompter {
    protected onDownKeyPress() { }
    protected onUpKeyPress() { }
    protected onTabKeyPress() { }
    protected onKeyPress() { }
  }

  const adapter = InquirerAdapter((proxy) => new TestPrompter(proxy))
  registerPrompt('test01', adapter);
  const {result} = await prompt({ type: 'test01' as any, name: 'result', message: '>' });
  console.debug('result:', result);
  process.exit()
}

if (require.main === module) {
  main();
}
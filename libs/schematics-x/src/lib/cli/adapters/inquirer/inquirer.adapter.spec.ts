import { createPromptModule, registerPrompt } from 'inquirer';
import { BasePrompter, SuggestPrompter } from '../../prompters';
import { InquirerAdapter } from './inquirer.adapter';
import { stdin } from 'mock-stdin';

describe('InquirerAdapter', () => {
  class TestPrompter extends BasePrompter {
    protected onDownKeyPress() { }
    protected onUpKeyPress() { }
    protected onTabKeyPress() { }
    protected onKeyPress() { }
  }

  const STDIN = stdin();

  it('should be succeeded', async () => {
    const adapter = InquirerAdapter((proxy) => new TestPrompter(proxy))
    registerPrompt('test', adapter);
    const prompt = createPromptModule({input: STDIN as any});
    const promise = prompt({ type: 'test' as any, name: 'result' });

    STDIN.send('example');
    STDIN.end();
    const {result} = await promise;
    expect(result).toEqual('example');
  });
});

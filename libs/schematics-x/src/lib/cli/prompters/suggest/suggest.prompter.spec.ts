import { TestBed } from "@nx-ddd/core";
import { createPromptModule, registerPrompt } from "inquirer";
import { stdin } from "mock-stdin";
import { InquirerAdapter } from "../../adapters/inquirer/inquirer.adapter";
import { SuggestModule } from "./suggest.module";
import { SuggestPrompter, SuggestPrompterFactory } from "./suggest.prompter";

describe('SuggestPrompter', () => {
  let factory: SuggestPrompterFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuggestModule],
      providers: []
    });
    factory = TestBed.inject(SuggestPrompterFactory);
  })

  const adapter = InquirerAdapter((proxy) => factory.create(proxy));
  const STDIN = stdin();

  it('should be succeeded', async () => {
    registerPrompt('suggest', adapter);
    const prompt = createPromptModule({input: STDIN as any});
    const promise = prompt({ type: 'suggest' as any, name: 'result' });

    STDIN.send('example');
    STDIN.end();
    const {result} = await promise;
    expect(result).toEqual('example');
  });
});

import { TestBed } from '@nx-ddd/core';
import { SuggestService } from './suggest.service';
import { SuggestModule } from './suggest.module';

describe('Suggester', () => {
  let service: SuggestService;

  it('should suggest', async () => {
    TestBed.configureTestingModule({
      imports: [
        SuggestModule
      ],
    });

    const service = TestBed.inject(SuggestService);
    const suggestions = await service.suggest('a');
    expect(suggestions).toEqual('auto pages/users');
    // const output = [
    //   "auto pages/users",
    //   "instruct -t pages/pages.module.ts --instructions 'Add route for `users`'",
    //   "auto pages/groups",
    //   "instruct -t pages/pages.module.ts --instructions 'Add route for `groups`'",
    // ].find(s => s.startsWith('a'));
    // expect(output).toEqual('auto pages/users');
  });
});

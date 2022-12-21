import { SuggestService } from './suggest.service';

describe('Suggester', () => {
  it('should suggest', async () => {
    const suggester = new SuggestService();
    const suggestions = await suggester.suggest('a');
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

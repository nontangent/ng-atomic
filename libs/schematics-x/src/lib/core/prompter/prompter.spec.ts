import { OpenAiPrompter } from './prompter';

jest.setTimeout(3000 * 1000);

const PROMPT_JSON = `
\`tree.json\` is 15 lines.

\`\`\`tree.json
[
  "/root/app.json",
`.slice(1);

describe('OpenAiPrompter', () => {
  let prompter: OpenAiPrompter;
  
  beforeEach(() => {
    prompter = new OpenAiPrompter();
  });

  xit('', async () => {
    prompter.write(PROMPT_JSON);
    await prompter.autoWriteUntilEnd();
    const fileEntry = prompter.getFileEntry('tree.json');
    const body = fileEntry.content.toString();
    expect(JSON.parse(body)).toBeTruthy();
  });

});
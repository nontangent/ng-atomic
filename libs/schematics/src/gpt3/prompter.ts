import { FileEntry } from "@angular-devkit/schematics";
import { Configuration, OpenAIApi } from "openai";

export interface Options {
  model?: 'text-curie-001' | 'code-davinci-002' | 'code-cushman-001',

}

export class OpenAiPrompter {
  protected config = new Configuration({apiKey: process.env['OPEN_AI_TOKEN']});

  constructor(protected _prompt: string) { }
  protected openai = new OpenAIApi(this.config);
  protected stop = '\n\`\`\`';

  get prompt(): string {
    return this._prompt;
  }

  async autoWrite(options?: Options) {
    try {
      const res = await this.openai.createCompletion({
        model: options?.model ?? 'code-cushman-001',
        prompt: this._prompt,
        temperature: 0,
        max_tokens: 512,
        stop: this.stop,
      });
  
      this._prompt += res.data.choices?.[0].text;
      this._prompt += res.data.choices?.[0].finish_reason === 'stop' ? this.stop : '';
    } catch (res) {
      console.error(res.response.data.error);
      throw new Error('OpenAI API Error');
    }
  }

  async autoWriteUntilEnd(options?: Options, maxRepeat: number = 3) {
    for (let i = 0; i < maxRepeat; i++) {
      if(this.isEnd()) return;
      await this.autoWrite();
    }
  }

  async write(text: string) {
    this._prompt += text;
  }

  isEnd() {
    return this._prompt.endsWith(this.stop);
  }

  getFileEntries(): FileEntry[] {
    return this._prompt.split('```').filter((_, i) => i % 2).map(code => {
      const [path, ...lines] = code.split('\n');
      return {path, content: Buffer.from(lines.join('\n').slice(0, -1))} as FileEntry;
    });
  }

  getFileEntry(path: string): FileEntry | null {
    const entries = this.getFileEntries();
    return entries.find(file => file.path === path) ?? null;
  }
}


export class JsonPrompter extends OpenAiPrompter {

  parseJson(prompt: string): string[] {
    return JSON.parse(prompt.match(/\`\`\`tree\.json\n([\s\S]*)\`\`\`/)?.[1]);
  }

  getJsonFuzzy(): string[] {
    let text = this.prompt;
    while(text.length) {
      let suffixes = ['"]\n```', ']\n```', '\n```', '```', '``', '`', ''];
  
      for (const suffix of suffixes) {
        try { return this.parseJson(text + suffix); } catch { }
      }

      text = text.slice(0, -1);
    }
  }
  
}

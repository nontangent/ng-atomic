import { FileEntry } from "@angular-devkit/schematics";
import { Configuration, OpenAIApi } from "openai";
import { AxiosError } from 'axios';
import { PromiseQueue } from "../promise-queue";
import { logger } from "../../cli/logger";

export interface WriteOptions {
  model?: 'text-curie-001' | 'text-babbage-001' | 'text-ada-001' | 'code-davinci-002' | 'code-cushman-001',
  temperature?: number,
  maxTokens?: number,
}

function isAxiosError(err: Error): err is AxiosError {
  return !!(err as any)?.isAxiosError;
}

export class OpenAiPrompter {
  protected _prompt: string = '';
  protected config = new Configuration({apiKey: this.token});

  constructor(
    protected promiseQueue: PromiseQueue,
    private token: string = process.env['OPEN_AI_TOKEN'],
  ) {
    if (!this.token?.length)
      throw new Error('OPEN_AI_TOKEN is not provided! Please `export OPEN_AI_TOKEN=<-OPEN_AI_TOKEN->`');
  }
  protected openai = new OpenAIApi(this.config);
  protected stop = '\n\`\`\`';

  get prompt(): string {
    return this._prompt;
  }

  async autoWrite(options?: WriteOptions) {
    try {
      const maxToken = 2048 - this.prompt.length;
      if (maxToken <= 0) {
        this.isEnd() || (this._prompt += this.stop);
        return;
      }

      // const res = await this.openai.createCompletion({
      //   model: options?.model ?? 'code-cushman-001',
      //   prompt: this._prompt,
      //   temperature: options?.temperature ?? 0,
      //   max_tokens: options?.maxTokens ? Math.min(options.maxTokens, maxToken) : maxToken,
      //   stop: this.stop,
      // });

      const res = await this.promiseQueue.add(() => this.openai.createCompletion({
        model: options?.model ?? 'code-cushman-001',
        prompt: this._prompt,
        temperature: options?.temperature ?? 0,
        max_tokens: options?.maxTokens ? Math.min(options.maxTokens, maxToken) : maxToken,
        stop: this.stop,
        // n: 1,
      }));

      logger.debug('choices:', res.data.choices.length);
      this._prompt += res.data.choices?.[0].text;
      this._prompt += res.data.choices?.[0].finish_reason === 'stop' ? this.stop : '';
    } catch (error) {
      process.env['SX_VERBOSE_LOGGING'] && console.error(this._prompt);
      if (isAxiosError(error)) {
        console.debug(error.response);
        switch(error.response.status) {
          case 429: {
            throw new Error(error.response.data.error?.message);
          }
          case 401: { // Error: Incorrect API key provided: undefined. You can find your API key at https://beta.openai.com.
            throw new Error(error.response.data.error?.message);
          }
          default: {
            throw new Error(error.response.data.error?.message);
          }
        }
      }
      throw error;
    }
  }

  async autoWriteUntilEnd(options?: WriteOptions, maxRepeat: number = 3) {
    for (let i = 0; i < maxRepeat; i++) {
      if(this.isEnd()) return;
      await this.autoWrite(options);
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

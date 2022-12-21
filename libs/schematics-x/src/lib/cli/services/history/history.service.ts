import { Inject, Injectable, InjectionToken, Optional } from '@nx-ddd/core';
import dayjs from 'dayjs';
import fs from 'fs';
import { appendFile, readFile } from 'fs/promises';
import { homedir } from 'os'
import { dirname } from 'path';


export interface SchematicExecution {
  version: string;
  execution: {
    collection: string;
    schematic: string;
    options: Record<string, any>;
    executedAt: dayjs.Dayjs;
  },
  result: {
    success: boolean;
  }
}

export const HISTORY_PATH = new InjectionToken('Sx History Path');

@Injectable()
export class HistoryService {
  constructor(
    @Optional() @Inject(HISTORY_PATH) protected historyPath?,
  ) {
    this.historyPath ??= `${homedir()}/.sx/history`;
  }

  async add(argv: string[]): Promise<void> {
    if (argv.length < 3) return;
    const command = argv.slice(2).join(' ');

    if(!fs.existsSync(this.historyPath)) {
      fs.mkdirSync(dirname(this.historyPath), {recursive: true});
      // fs.writeFileSync(this.historyPath, '', { encoding: 'utf-8' });
    }

    await appendFile(this.historyPath, `\n${command}`, { encoding: 'utf-8' })
  }

  async list(): Promise<string[]> {
    return readFile(this.historyPath, { encoding: 'utf-8' })
      .then((content) => content.split('\n').filter((line) => line !== ''));
  }
}


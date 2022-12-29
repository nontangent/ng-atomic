import { Inject, Injectable, InjectionToken, Optional } from '@nx-ddd/core';
import dayjs from 'dayjs';
import fs from 'fs';
import { appendFile, readFile } from 'fs/promises';
import { homedir } from 'os'
import { dirname } from 'path';
import { from, Observable, ReplaySubject, switchMap } from 'rxjs';


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
  private readonly refresh$ = new ReplaySubject<void>(1);

  constructor(
    @Optional() @Inject(HISTORY_PATH) protected historyPath?,
  ) {
    this.historyPath ??= `${homedir()}/.sx/history`;
    this.refresh$.next();
  }

  async add(argv: string[]): Promise<void> {
    if (argv.length < 3) return;
    const command = argv.slice(2).join(' ');

    if(!fs.existsSync(this.historyPath)) {
      fs.mkdirSync(dirname(this.historyPath), {recursive: true});
    }

    await appendFile(this.historyPath, `\n${command}`, { encoding: 'utf-8' })
    this.refresh();
  }

  async list(): Promise<string[]> {
    if(!fs.existsSync(this.historyPath)) return [];

    return readFile(this.historyPath, { encoding: 'utf-8' })
      .then((content) => content.split('\n').filter((line) => line !== ''));
  }

  changes(): Observable<string[]> {
    return this.refresh$.pipe(
      switchMap(() => this.list()),
    );
  }

  refresh() {
    this.refresh$.next();
  }
}


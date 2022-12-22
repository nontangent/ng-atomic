import { Injectable } from '@nx-ddd/core';
import dayjs from 'dayjs';
import { filter, interval, map, tap } from 'rxjs';
import { logger } from '../../cli/logger';

class Task {
  startAt: dayjs.Dayjs | null = null;
  status: 'todo' | 'wip' | 'done' = 'todo';
  constructor(protected task: () => Promise<any>) { }

  private resolve: (value: any) => void;
  private reject: (reason?: any) => void;

  async execute() {
    try {
      this.startAt = dayjs();
      this.status = 'wip';
      const res = await this.task();
      this.resolve(res);
    } catch (error) {
      this.reject(error);
    } finally {
      this.status = 'done';
    }
  }

  promise(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

@Injectable()
export class PromiseQueue {
  private readonly queue: Task[] = [];

  get rate(): number {
    return this.queue.filter(task => {
      return task.status !== 'todo' && task.startAt.isAfter(this.before1min);
    }).length
  }

  get stop(): boolean {
    return this.rate >= 8;
  }

  get before1min() {
    return dayjs().subtract(1, 'minute');
  }

  task$ = interval(100).pipe(
    filter(() => !this.stop),
    map(() => this.queue.shift()),
    filter((task) => !!task),
  );

  constructor() {
    this.task$.subscribe((task) => {
      if (task.status === 'todo') {
        task.execute();
        this.queue.push(task);
      } else if (task.startAt.isAfter(this.before1min)) {
        this.queue.push(task);
      }
    });

    interval(5000).pipe(
      tap(() => logger.debug(`Open AI Rate(${dayjs().format()}): ${this.rate}`)),
    ).subscribe(() => {});
  }

  async add<T>(promise: () => Promise<T>): Promise<T> {
    const task = new Task(promise);
    this.queue.push(task);
    return task.promise();
  }
}

import { Injectable } from "@nx-ddd/core";

@Injectable()
export class LoggingQueueService {
  private queue: string[] = [];

  constructor() { }

  push(item) {
    this.queue.push(item);
  }

  forEach(callback) {
    this.queue.forEach(callback);
  }

  clear() {
    this.queue = [];
  }
}

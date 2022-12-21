import { DryRunEvent } from '@angular-devkit/schematics';
import { Injectable } from '@nx-ddd/core';
import ansiColors from 'ansi-colors';
import { LoggingService } from '../../../services/logging';
import { LoggingQueueService } from '../../../services/logging-queue';

const colors = ansiColors.create();

@Injectable()
export class DryRunEventHandler {

  constructor(
    public logger: LoggingService,
    public loggingQueue: LoggingQueueService,
  ) { }

  handle(event: DryRunEvent) {
    const eventPath = event.path.startsWith('/') ? event.path.slice(1) : event.path;

    switch (event.kind) {
      case 'error':
        const desc = event.description == 'alreadyExist' ? 'already exists' : 'does not exist';
        this.logger.error(`ERROR! ${eventPath} ${desc}.`);
        break;
      case 'update':
        this.loggingQueue.push(`${colors.cyan('UPDATE')} ${eventPath} (${event.content.length} bytes)`);
        break;
      case 'create':
        this.loggingQueue.push(`${colors.green('CREATE')} ${eventPath} (${event.content.length} bytes)`);
        break;
      case 'delete':
        this.loggingQueue.push(`${colors.yellow('DELETE')} ${eventPath}`);
        break;
      case 'rename':
        const eventToPath = event.to.startsWith('/') ? event.to.slice(1) : event.to;
        this.loggingQueue.push(`${colors.blue('RENAME')} ${eventPath} => ${eventToPath}`);
        break;
    }
  }
}

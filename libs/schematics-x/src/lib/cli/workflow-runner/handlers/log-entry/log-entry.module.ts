import { NxModule } from '@nx-ddd/core';
import { LogEntryHandler, STD_ERR, STD_OUT } from './log-entry.handler';

@NxModule({
  providers: [LogEntryHandler],
})
export class LogEntryModule {
  static withOptions(options: {stdout, stderr}) {
    return {
      module: LogEntryModule,
      providers: [
        { provide: STD_OUT, useValue: options.stdout },
        { provide: STD_ERR, useValue: options.stderr },
      ],
    };
  }
}

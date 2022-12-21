import { NxModule } from '@nx-ddd/core';
import { DryRunEventModule } from './dry-run-event';
import { ExecuteErrorModule } from './execute-error';
import { LifeCycleEventModule } from './life-cycle-event';
import { LogEntryModule } from './log-entry';

@NxModule({
  imports: [
    DryRunEventModule,
    ExecuteErrorModule,
    LifeCycleEventModule,
    LogEntryModule,
  ]
})
export class HandlersModule { }

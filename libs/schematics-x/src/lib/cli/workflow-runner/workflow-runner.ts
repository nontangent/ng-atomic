import { Injectable } from '@nx-ddd/core';
import { filter, tap } from 'rxjs';
import {
  DryRunEventHandler,
  ExecuteErrorHandler,
  LogEntryHandler,
  LifeCycleEventHandler,
} from './handlers';
import { WorkflowOptions, ParsedCliOptions } from './options';
import { WorkflowExecuter } from './executer';
import { _createPromptProvider } from '../utils/create-prompt-provider';
import { isTTY } from '../utils/is-tty';
import { LoggingQueueService } from '../services/logging-queue';
import { WorkflowRunnerStore } from './workflow-runner.store';
import { LoggingService } from '../services/logging';

@Injectable()
export class WorkflowRunner {

  constructor(
    protected workflow?: WorkflowExecuter,
    protected logger?: LoggingService,
    protected loggingQueue?: LoggingQueueService,
    protected errorHandler?: ExecuteErrorHandler,
    protected dryRunHandler?: DryRunEventHandler,
    protected logEntryHandler?: LogEntryHandler,
    protected lifeCycleHandler?: LifeCycleEventHandler,
    protected store?: WorkflowRunnerStore,
  ) { }

  async run(options: WorkflowOptions): Promise<0 | 1> {
    this.logger.pipe(
      filter((entry) => entry.level !== 'debug' || options.cliOptions.verbose),
    ).subscribe(entry => this.logEntryHandler.handle(entry));

    this.initWorkflow(options);

    if (options.cliOptions.debug) {
      this.logger.info(`Debug mode enabled.`);
    }

    return this.workflow.execute(options).toPromise().then(() => {
      if (this.store.nothingDone) {
        this.logger.info('Nothing to be done.');
      } else if (options.cliOptions.dryRun) {
        this.logger.info(this.GET_DRY_RUN_MESSAGE(options));
      }
      return 0;
    }).catch((err) => (this.errorHandler.handle(err), 1)) as Promise<0 | 1>;
  }

  GET_DRY_RUN_MESSAGE(options: WorkflowOptions): string {
    return (options.cliOptions as ParsedCliOptions).dryRunPresent !== null
      ? `Dry run enabled. No files written to disk.`
      : `Dry run enabled by default in debug mode. No files written to disk.`;
  }

  protected initWorkflow(options: WorkflowOptions) {
    this.workflow.init(options);
    this.workflow.reporter.pipe(
      tap(({kind}) => {
        this.store.nothingDone = false;
        if (kind === 'error') this.store.error = true;
      }),
    ).subscribe((event) => this.dryRunHandler.handle(event));
    this.workflow.lifeCycle.subscribe((event) => this.lifeCycleHandler.handle(event));
    this.workflow.registry.useXDeprecatedProvider((msg) => this.logger.warn(msg));
    this.workflow.registry.addSmartDefaultProvider('argv', (schema) => 'index' in schema
      ? options.schematicArgs[Number(schema['index'])]
      : options.schematicArgs,
    );

    if (options.cliOptions.interactive && isTTY()) {
      this.workflow.registry.usePromptProvider(_createPromptProvider());
    }
  }
}

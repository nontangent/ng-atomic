import { NodeWorkflow } from '@angular-devkit/schematics/tools';
import { Injectable } from '@nx-ddd/core';
import { Observable } from 'rxjs';
import { LoggingService } from '../../services/logging';
import { _createPromptProvider } from '../../utils/create-prompt-provider';
import { WorkflowOptions } from '../options';

@Injectable()
export class WorkflowExecuter {
  protected workflow: NodeWorkflow;

  constructor(
    protected logger: LoggingService,
  ) { }

  init(options: WorkflowOptions) {
    this.workflow = new NodeWorkflow((options.fsHost || process.cwd()) as any, {
      force: options.cliOptions.force,
      dryRun: options.cliOptions.dryRun,
      resolvePaths: [process.cwd(), __dirname],
      schemaValidation: true,
    });
  }

  execute(options: WorkflowOptions): Observable<void> {
    return this.workflow.execute({
      collection: options.collectionName,
      schematic: options.schematicName,
      options: options.schematicOptions,
      allowPrivate: !!options.cliOptions.allowPrivate,
      debug: options.cliOptions.debug,
      logger: this.logger,
    });
  }

  get reporter() {
    return this.workflow.reporter;
  }

  get lifeCycle() {
    return this.workflow.lifeCycle;
  }

  get registry() {
    return this.workflow.registry;
  }
}

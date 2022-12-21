import { UnsuccessfulWorkflowExecution } from "@angular-devkit/schematics";
import { Inject, Injectable, InjectionToken } from "@nx-ddd/core";
import { LoggingService } from "../../../services/logging";

export const DEBUG = new InjectionToken('[schematics-x] Debug Mode');

@Injectable()
export class ExecuteErrorHandler {
  constructor(
    protected logger: LoggingService,
    @Inject(DEBUG) protected debug: boolean,
  ) { }

  handle(error) {
    if (error instanceof UnsuccessfulWorkflowExecution) {
      this.logger.fatal('The Schematic workflow failed. See above.');
    } else if (this.debug && error instanceof Error) {
      this.logger.fatal(`An error occured:\n${error.stack}`);
    } else {
      this.logger.fatal(`Error: ${error instanceof Error ? error.message : error}`);
    }
  }
}

import { createNxModuleRef, NxModule } from "@nx-ddd/core";
import { LoggingModule } from "../services/logging";
import { LoggingQueueModule } from "../services/logging-queue";
import { WorkflowExecuterModule } from "./executer";
import { HandlersModule } from "./handlers";
import { WorkflowOptions, WORKFLOW_OPTIONS } from "./options";
import { WorkflowRunner } from "./workflow-runner";
import { WorkflowRunnerStore } from "./workflow-runner.store";

@NxModule({
  imports: [
    WorkflowExecuterModule,
    HandlersModule,
    LoggingModule,
    LoggingQueueModule,
  ],
  providers: [
    WorkflowRunner,
    WorkflowRunnerStore,
  ],
})
export class WorkflowRunnerModule {
  static withOptions(options: WorkflowOptions) {
    return {
      ngModule: WorkflowRunnerModule,
      providers: [
        { provide: WORKFLOW_OPTIONS, useValue: options },
      ],
    };
  }
}

export function injectWorkflowRunner(options: WorkflowOptions) {
  const {injector} = createNxModuleRef(NxModule({
    imports: [WorkflowRunnerModule.withOptions(options)],
  }));
  return injector.get(WorkflowRunner);
}

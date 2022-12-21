import { Injectable } from "@nx-ddd/core";
import { _createPromptProvider } from '../utils/create-prompt-provider';
import { WorkflowRunner } from '../workflow-runner';
import { parseSchematicOptions, SchematicRunnerOptions } from "./options";

@Injectable()
export class SchematicRunner {
  constructor(
    protected workflowRunner: WorkflowRunner,
  ) { }

  async run(options: SchematicRunnerOptions) {
    const workflowOptions = parseSchematicOptions(options);
    return this.workflowRunner.run(workflowOptions)
      .then((exitCode) => (process.exitCode = exitCode))
      .catch((e) => { throw e; });
  }  
}

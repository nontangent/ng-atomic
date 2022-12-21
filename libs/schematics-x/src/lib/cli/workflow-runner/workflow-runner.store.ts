import { Injectable } from "@nx-ddd/core";

@Injectable()
export class WorkflowRunnerStore {
  error: boolean = false;
  nothingDone = true;
}

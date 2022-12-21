import { NxModule } from "@nx-ddd/core";
import { LoggingModule } from "../../services/logging";
import { WorkflowExecuter } from "./workflow-executer";

@NxModule({
  imports: [
    LoggingModule,
  ],
  providers: [WorkflowExecuter]
})
export class WorkflowExecuterModule { }

import { NxModule } from "@nx-ddd/core";
import { LoggingModule } from "../../../services/logging";
import { ExecuteErrorHandler } from "./execute-error.handler";

@NxModule({
  imports: [
    LoggingModule,
  ],
  providers: [ExecuteErrorHandler],
})
export class ExecuteErrorModule { }

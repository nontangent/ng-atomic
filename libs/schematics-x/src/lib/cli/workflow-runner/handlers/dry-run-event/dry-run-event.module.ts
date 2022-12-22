import { NxModule } from "@nx-ddd/core";
import { LoggingModule } from "../../../services/logging";
import { LoggingQueueModule } from "../../../services/logging-queue";
import { DryRunEventHandler } from "./dry-run-event.handler";

@NxModule({
  imports: [
    LoggingModule,
    LoggingQueueModule,
  ],
  providers: [DryRunEventHandler],
})
export class DryRunEventModule { }

import { NxModule } from "@nx-ddd/core";
import { LoggingModule } from "../../../services/logging";
import { LoggingQueueModule } from "../../../services/logging-queue";
import { LifeCycleEventHandler } from "./life-cycle-event.handler";

@NxModule({
  imports: [
    LoggingModule,
    LoggingQueueModule,
  ],
  providers: [LifeCycleEventHandler],
})
export class LifeCycleEventModule { }

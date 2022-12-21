import { NxModule } from "@nx-ddd/core";
import { LoggingQueueService } from "./logging-queue.service";

@NxModule({
  providers: [LoggingQueueService],
})
export class LoggingQueueModule { }

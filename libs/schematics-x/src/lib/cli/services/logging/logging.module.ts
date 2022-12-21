import { NxModule } from "@nx-ddd/core";
import { LoggingService } from "./logging.service";

@NxModule({
  providers: [LoggingService],
})
export class LoggingModule { }

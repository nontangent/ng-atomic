import { NxModule } from "@nx-ddd/core";
import { logger, Logger } from "./logger";

@NxModule({
  imports: [],
  providers: [
    {provide: Logger, useValue: logger}
  ],
})
export class LoggerModule { }


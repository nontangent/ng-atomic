import { NxModule } from "@nx-ddd/core";
import { SchematicsXCli } from "./cli";
import { InteractiveModule } from "./commands/interactive";
import { VersionModule } from "./commands/version";
import { LoggerModule } from "./logger";
import { HistoryModule } from "./services/history";

@NxModule({
  imports: [
    InteractiveModule,
    VersionModule,
    HistoryModule,
    LoggerModule,
  ],
  providers: [SchematicsXCli],
})
export class  SchematicsXCliModule { }
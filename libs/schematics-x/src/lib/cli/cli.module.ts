import { NxModule } from "@nx-ddd/core";
import { SchematicsXCli } from "./cli";
import { InteractiveModule } from "./commands/interactive";
import { VersionModule } from "./commands/version";
import { HistoryModule } from "./services/history";

@NxModule({
  imports: [
    InteractiveModule,
    VersionModule,
    HistoryModule,
  ],
  providers: [SchematicsXCli],
})
export class  SchematicsXCliModule { }
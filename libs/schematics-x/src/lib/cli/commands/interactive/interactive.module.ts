import { NxModule } from "@nx-ddd/core";
import { LoggerModule } from "../../logger";
import { SuggestModule } from "../../prompters";
import { SchematicRunnerModule } from "../../schematic-runner";
import { HistoryModule } from "../../services/history";
import { InteractiveCommand } from "./interactive.command";

@NxModule({
  imports: [
    SchematicRunnerModule,
    HistoryModule,
    SuggestModule,
    LoggerModule,
  ],
  providers: [InteractiveCommand],
})
export class InteractiveModule { }
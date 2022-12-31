import { NxModule } from "@nx-ddd/core";
import { LoggerModule } from "../../logger";
import { SchematicRunnerModule } from "../../schematic-runner";
import { HistoryModule } from "../../services/history";
import { InteractiveCommand, InteractivePrompterFactory } from "./interactive.command";

@NxModule({
  imports: [
    SchematicRunnerModule,
    HistoryModule,
    LoggerModule,
  ],
  providers: [
    InteractiveCommand,
    InteractivePrompterFactory,
  ],
})
export class InteractiveModule { }
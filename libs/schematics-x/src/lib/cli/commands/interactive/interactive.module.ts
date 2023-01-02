import { NxModule } from "@nx-ddd/core";
import { PromptsRegistry } from "../../core/prompts-registry";
import { LoggerModule } from "../../logger";
import { SchematicRunnerModule } from "../../schematic-runner";
import { HistoryModule } from "../../services/history";
import { InteractiveCommand } from "./interactive.command";

@NxModule({
  imports: [
    SchematicRunnerModule,
    HistoryModule,
    LoggerModule,
  ],
  providers: [
    InteractiveCommand,
    PromptsRegistry,
  ],
})
export class InteractiveModule { }
import { NxModule } from "@nx-ddd/core";
import { LoggerModule } from "../../logger";
import { PrompterModule } from "../../prompter";
import { SchematicRunnerModule } from "../../schematic-runner";
import { HistoryModule } from "../../services/history";
import { InteractiveCommand } from "./interactive.command";

@NxModule({
  imports: [
    SchematicRunnerModule,
    HistoryModule,
    PrompterModule,
    LoggerModule,
  ],
  providers: [InteractiveCommand],
})
export class InteractiveModule { }
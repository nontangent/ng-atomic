import { NxModule } from "@nx-ddd/core";
import { SchematicRunnerModule } from "../../schematic-runner";
import { HistoryModule } from "../../services/history";
import { InteractiveCommand } from "./interactive.command";

@NxModule({
  imports: [
    SchematicRunnerModule,
    HistoryModule,
  ],
  providers: [InteractiveCommand],
})
export class InteractiveModule { }
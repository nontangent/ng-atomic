import { NxModule } from "@nx-ddd/core";
import { SuggestModule } from "../../prompters";
import { SchematicRunnerModule } from "../../schematic-runner";
import { HistoryModule } from "../../services/history";
import { InteractiveCommand } from "./interactive.command";

@NxModule({
  imports: [
    SchematicRunnerModule,
    HistoryModule,
    SuggestModule,
  ],
  providers: [InteractiveCommand],
})
export class InteractiveModule { }
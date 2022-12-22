import { NxModule } from "@nx-ddd/core";
import { CommandModule } from "../../../core/estimators/command";
import { LoggerModule } from "../../logger";
import { HistoryModule } from "../history";
import { SuggestService, HistoryEstimator } from "./suggest.service";

@NxModule({
  imports: [
    HistoryModule,
    LoggerModule,
    CommandModule,
  ],
  providers: [SuggestService, HistoryEstimator],
})
export class SuggestModule { }

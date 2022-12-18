import { NxModule } from "@nx-ddd/core";
import { HistoryService } from "./history.service";

@NxModule({
  imports: [],
  providers: [HistoryService],
})
export class HistoryModule { }

import { NxModule } from "@nx-ddd/core";
import { HistoryModule } from "../history";
import { SuggestService } from "./suggest.service";

@NxModule({
  imports: [
    HistoryModule,
  ],
  providers: [SuggestService],
})
export class SuggestModule { }

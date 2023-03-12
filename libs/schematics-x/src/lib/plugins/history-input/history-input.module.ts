import { NxModule } from "@nx-ddd/core";
import { RendererModule } from "../../cli/renderer";
import { HistoryModule } from "../../cli/services/history";
import { HistoryInputPrompter } from "./history-input.prompter";
import { HistoryInputPrompterPresenter } from "./history-input.prompter.presenter";
import { HistoryInputPrompterStore } from "./history-input.prompter.store";

@NxModule({
  imports: [
    HistoryModule,
    RendererModule,
  ],
  providers: [
    HistoryInputPrompter,
    HistoryInputPrompterPresenter,
    HistoryInputPrompterStore,
  ]
})
export class HistoryInputModule { }

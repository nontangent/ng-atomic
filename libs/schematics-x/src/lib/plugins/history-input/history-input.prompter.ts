import { Injectable } from "@nx-ddd/core";
import { HistoryService } from "../../cli/services/history";
import { Prompter } from '../../cli/prompters/input/prompter';
import { HistoryInputPrompterPresenter } from "./history-input.prompter.presenter";
import { HistoryInputPrompterStore } from "./history-input.prompter.store";

@Injectable()
export class HistoryInputPrompter extends Prompter {

  constructor(
    protected history: HistoryService,
    protected presenter: HistoryInputPrompterPresenter,
    protected store: HistoryInputPrompterStore,
  ) {
    super(presenter, store);
  }

}

import { PROMPTS_REGISTER } from "../../cli/core/prompts-registry";
import { GlobalProvidersManager } from "../../core";
import { HistoryInputModule } from "./history-input.module";
import { HistoryInputPrompter } from "./history-input.prompter";

export function register() {
  GlobalProvidersManager.register([
    {
      provide: PROMPTS_REGISTER,
      useValue: () => ({name: 'suggest', prompterType: HistoryInputPrompter, nxModuleDef: HistoryInputModule}),
      multi: true,
    },
  ]);
}

register();

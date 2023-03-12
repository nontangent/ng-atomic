import { PROMPTS_REGISTER } from "../../cli/core/prompts-registry";
import { GlobalProvidersManager } from "../../core";
import { TreeEditModule } from "./presenter";
import { TreeEditPrompter } from "./presenter";

export function register() {
  GlobalProvidersManager.register([
    {
      provide: PROMPTS_REGISTER,
      useValue: () => ({name: 'tree-edit', prompterType: TreeEditPrompter, nxModuleDef: TreeEditModule}),
      multi: true,
    },
  ]);
}

register();

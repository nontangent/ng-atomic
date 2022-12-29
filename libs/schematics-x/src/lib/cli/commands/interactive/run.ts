import { createNxModuleRef, NxModule } from "@nx-ddd/core";
import { InteractiveCommand } from "./interactive.command";
import { InteractiveModule } from "./interactive.module";
import { prompt, registerPrompt } from 'inquirer';
import { SuggestService } from "../../services/suggest";
import { DEBUG } from "../../workflow-runner/handlers";

async function main() {
  const { injector } = createNxModuleRef(NxModule({
    imports: [InteractiveModule],
    providers: [
      // ...GlobalProvidersManager.providers,
      { provide: DEBUG, useValue: true },
      // { provide: SuggestService, useValue: {} },
    ],
  })(class {})); 
  await injector.get(InteractiveCommand).action();
}

if (require.main === module) {
  main().then(() => process.exit());
}

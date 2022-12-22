#!/usr/bin/env node
import { createNxModuleRef, NxModule } from '@nx-ddd/core';
import { SchematicsXCli, SchematicsXCliModule } from '../cli';
import { InteractiveCommand } from '../cli/commands/interactive';
import { VersionCommand } from '../cli/commands/version';
import { DEBUG } from '../cli/workflow-runner/handlers';
import { GlobalProvidersManager } from '../core';


export async function main() {
  const { injector } = createNxModuleRef(NxModule({
    imports: [SchematicsXCliModule],
    providers: [
      ...GlobalProvidersManager.providers,
      { provide: DEBUG, useValue: false },
    ],
  })(class {}));

  const cli = injector.get(SchematicsXCli);
  cli.registerSchematicsCommand();
  cli.register(injector.get(VersionCommand));
  cli.register(injector.get(InteractiveCommand));
  await cli.parse();
}

if (require.main === module) {
  main();
}

import { createNxModuleRef, NxModule } from "@nx-ddd/core";
import { Provider } from "@nx-ddd/core/di/interface/provider";
import { WorkflowRunnerModule } from "../workflow-runner";
import { SchematicRunner } from "./schematic-runner";

@NxModule({
  imports: [WorkflowRunnerModule],
  providers: [SchematicRunner],
})
export class SchematicRunnerModule { }

export function injectSchematicRunner(providers?: Provider[]) {
  const {injector} = createNxModuleRef(NxModule({
    imports: [SchematicRunnerModule],
    providers,
  })(class {}));
  return injector.get(SchematicRunner);
}

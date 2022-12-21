import { NxModule } from "@nx-ddd/core";
import { InstructorModule } from "../../instructor";
import { CommandEstimator } from "./command.estimator";

@NxModule({
  imports: [
    InstructorModule,
  ],
  providers: [CommandEstimator],
})
export class CommandModule { }

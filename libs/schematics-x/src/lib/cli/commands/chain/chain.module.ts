import { NxModule } from "@nx-ddd/core";
import { ChainCommand } from "./chain.command";

@NxModule({
  providers: [ChainCommand],
})
export class ChainModule { }

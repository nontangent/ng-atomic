import { NxModule } from "@nx-ddd/core";
import { Prompter, PrompterFactory } from "./prompter";

@NxModule({
  imports: [],
  providers: [
    Prompter,
    PrompterFactory,
  ]
})
export class PrompterModule { }

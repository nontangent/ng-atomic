import { NxModule } from "@nx-ddd/core";
import { RendererModule } from "../../renderer";
import { Presenter } from "./presenter";
import { Prompter } from "./prompter";
import { PrompterStore } from "./prompter.store";

@NxModule({
  imports: [
    RendererModule,
  ],
  providers: [
    Prompter,
    Presenter,
    PrompterStore,
  ]
})
export class PrompterModule { }

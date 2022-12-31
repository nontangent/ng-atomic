import { NxModule } from "@nx-ddd/core";
import { Renderer } from "./renderer";

@NxModule({
  providers: [Renderer],
})
export class RendererModule { }

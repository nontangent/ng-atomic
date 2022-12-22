import { NxModule } from "@nx-ddd/core";
import { VersionCommand } from "./version.command";

@NxModule({
  providers: [VersionCommand],
})
export class VersionModule { }
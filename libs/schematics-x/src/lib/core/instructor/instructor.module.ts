import { NxModule } from "@nx-ddd/core";
import { Instructor } from "./instructor";

@NxModule({
  imports: [],
  providers: [Instructor],
})
export class InstructorModule { }

import { NxModule } from "@nx-ddd/core";
import { PromiseQueueModule } from "../promise-queue";
import { Instructor } from "./instructor";

@NxModule({
  imports: [PromiseQueueModule],
  providers: [Instructor],
})
export class InstructorModule { }

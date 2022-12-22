import { NxModule } from "@nx-ddd/core";
import { PromiseQueue } from "./promise-queue";

@NxModule({
  imports: [],
  providers: [
    { provide: PromiseQueue, useValue: new PromiseQueue() },
  ],
})
export class PromiseQueueModule { }

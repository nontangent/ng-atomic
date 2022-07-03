import { NgModule } from "@angular/core";
import { SmartExpPipe } from "./smart-exp.pipe";

@NgModule({
  declarations: [SmartExpPipe],
  exports: [SmartExpPipe]
})
export class SmartExpModule { }
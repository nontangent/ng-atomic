import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsModule } from '@ng-atomic/elements';
import { SmartMenuFrame } from './smart-menu.frame';



@NgModule({
  declarations: [SmartMenuFrame],
  imports: [
    CommonModule
  ],
  exports: [SmartMenuFrame]
})
export class SmartMenuModule extends ElementsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsModule } from '@ng-atomic/elements';

import { AutoLayoutFrame } from './auto-layout.frame';


@NgModule({
  declarations: [
    AutoLayoutFrame
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutoLayoutFrame
  ]
})
export class AutoLayoutModule extends ElementsModule { }
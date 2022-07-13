import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LineUpFrame } from './line-up.frame';


@NgModule({
  declarations: [LineUpFrame],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [LineUpFrame]
})
export class LineUpModule { }
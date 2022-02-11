import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YenPipe } from './yen.pipe';



@NgModule({
  declarations: [
    YenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YenPipe
  ]
})
export class YenModule { }

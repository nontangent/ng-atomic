import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartClampPipe } from './smart-clamp.pipe';



@NgModule({
  declarations: [
    SmartClampPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SmartClampPipe
  ]
})
export class SmartClampModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartFieldPipe } from './smart-field.pipe';



@NgModule({
  declarations: [
    SmartFieldPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SmartFieldPipe
  ]
})
export class SmartFieldModule { }

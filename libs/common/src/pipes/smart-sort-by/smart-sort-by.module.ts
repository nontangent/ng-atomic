import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartSortByPipe } from './smart-sort-by.pipe';



@NgModule({
  declarations: [
    SmartSortByPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SmartSortByPipe
  ]
})
export class SmartSortByModule { }

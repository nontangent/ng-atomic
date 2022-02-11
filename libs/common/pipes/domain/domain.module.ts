import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainPipe } from './domain.pipe';



@NgModule({
  declarations: [
    DomainPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DomainPipe
  ]
})
export class DomainModule { }

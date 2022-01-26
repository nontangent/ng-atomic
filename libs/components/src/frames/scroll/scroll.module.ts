import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollFrame } from './scroll.frame';
import { IosSafariScrollBuggyfillModule } from '../../directives';


@NgModule({
  declarations: [
    ScrollFrame
  ],
  imports: [
    CommonModule,
    IosSafariScrollBuggyfillModule,
  ],
  exports: [
    ScrollFrame
  ]
})
export class ScrollModule { }

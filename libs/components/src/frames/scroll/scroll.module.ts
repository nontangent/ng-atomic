import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IosSafariScrollBuggyfillModule } from '@ng-atomic/common/directives/ios-safari-scroll-buggyfill';
import { ScrollFrame } from './scroll.frame';


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

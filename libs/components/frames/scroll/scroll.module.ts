import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IosSafariScrollBuggyfillModule } from '@ng-atomic/common/directives';
import { ScrollFrame } from './scroll.frame';
import { ElementsModule } from '@ng-atomic/elements';


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
export class ScrollModule extends ElementsModule { }

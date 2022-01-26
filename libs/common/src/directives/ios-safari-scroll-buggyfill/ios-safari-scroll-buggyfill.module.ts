import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IosSafariScrollBuggyfillDirective } from './ios-safari-scroll-buggyfill.directive';



@NgModule({
  declarations: [
    IosSafariScrollBuggyfillDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    IosSafariScrollBuggyfillDirective,
  ]
})
export class IosSafariScrollBuggyfillModule { }

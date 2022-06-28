import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsModule } from '@ng-atomic/elements';

import { HeadingOrganism } from './heading.organism';


@NgModule({
  declarations: [
    HeadingOrganism
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeadingOrganism
  ]
})
export class HeadingModule extends ElementsModule { }

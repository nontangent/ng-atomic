import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class HeadingModule { }

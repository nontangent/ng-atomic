import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectInputFieldModule } from '@ng-atomic/components/molecules/select-input-field';

import { SelectInputSectionOrganism } from './select-input-section.organism';


@NgModule({
  declarations: [
    SelectInputSectionOrganism
  ],
  imports: [
    CommonModule,
    // Molecules
    SelectInputFieldModule,
  ],
  exports: [
    SelectInputSectionOrganism
  ]
})
export class SelectInputSectionModule { }

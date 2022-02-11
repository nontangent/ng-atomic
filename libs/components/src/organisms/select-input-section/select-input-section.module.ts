import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectInputSectionOrganism } from './select-input-section.organism';

import { SelectInputFieldModule } from '@ng-atomic/components/molecules/select-input-field';

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

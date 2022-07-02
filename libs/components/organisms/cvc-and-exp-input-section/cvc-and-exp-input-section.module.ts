import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputFieldModule } from '@ng-atomic/components/molecules/text-input-field';
import { SelectInputFieldModule } from '@ng-atomic/components/molecules/select-input-field';

import { CvcAndExpInputSectionOrganism } from './cvc-and-exp-input-section.organism';


@NgModule({
  declarations: [CvcAndExpInputSectionOrganism],
  imports: [
    CommonModule,
    // Molecules
    SelectInputFieldModule,
    TextInputFieldModule,
  ],
  exports: [CvcAndExpInputSectionOrganism]
})
export class CvcAndExpInputSectionModule { }

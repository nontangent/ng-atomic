import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputFieldModule } from '@ng-atomic/components/molecules/text-input-field';

import { CardInputSectionOrganism } from './card-input-section.organism';



@NgModule({
  declarations: [CardInputSectionOrganism],
  imports: [
    CommonModule,
    // Molecules
    TextInputFieldModule,
  ],
  exports: [CardInputSectionOrganism]
})
export class CardInputSectionModule { }

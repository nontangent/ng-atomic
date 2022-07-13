import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputFieldModule } from '@ng-atomic/components/molecules/text-input-field';
import { TextInputSectionOrganism } from './text-input-section.organism';


@NgModule({
  declarations: [
    TextInputSectionOrganism
  ],
  imports: [
    CommonModule,
    // Molecules
    TextInputFieldModule,
  ],
  exports: [
    TextInputSectionOrganism
  ]
})
export class TextInputSectionModule { }

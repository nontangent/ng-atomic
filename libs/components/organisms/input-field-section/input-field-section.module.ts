import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputFieldModule } from '@ng-atomic/components/molecules/text-input-field';
import { InputFieldSectionOrganism } from './input-field-section.organism';


@NgModule({
  declarations: [
    InputFieldSectionOrganism
  ],
  imports: [
    CommonModule,
    // Molecules
    TextInputFieldModule,
  ],
  exports: [
    InputFieldSectionOrganism
  ]
})
export class InputFieldSectionModule { }

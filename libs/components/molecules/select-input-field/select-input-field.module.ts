import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ElementsModule } from '@ng-atomic/elements';

import { SelectInputFieldMolecule } from './select-input-field.molecule';



@NgModule({
  declarations: [
    SelectInputFieldMolecule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Materials
    MatSelectModule,
  ],
  exports: [
    SelectInputFieldMolecule
  ]
})
export class SelectInputFieldModule extends ElementsModule { }
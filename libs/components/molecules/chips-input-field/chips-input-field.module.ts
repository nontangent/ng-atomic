import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsInputModule } from '@ng-atomic/components/atoms/chips-input';
import { ElementsModule } from '@ng-atomic/elements';

import { ChipsInputFieldMolecule } from './chips-input-field.molecule';

@NgModule({
  declarations: [
    ChipsInputFieldMolecule
  ],
  imports: [
    CommonModule,
    // Atoms
    ChipsInputModule,
  ],
  exports: [
    ChipsInputFieldMolecule
  ]
})
export class ChipsInputFieldModule extends ElementsModule { }

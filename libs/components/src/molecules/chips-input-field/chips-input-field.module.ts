import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsInputModule } from '@ng-atomic/components/atoms/chips-input';

import { ChipsInputFieldMolecule } from './chips-input-field.molecule';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ChipsInputFieldMolecule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Materials
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    // Atoms
    ChipsInputModule,
  ],
  exports: [ChipsInputFieldMolecule],
  bootstrap: [ChipsInputFieldMolecule],
})
export class ChipsInputFieldModule { }

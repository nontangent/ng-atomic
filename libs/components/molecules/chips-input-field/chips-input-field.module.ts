import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsInputFieldMolecule } from './chips-input-field.molecule';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
  ],
  exports: [
    ChipsInputFieldMolecule
  ]
})
export class ChipsInputFieldModule { }

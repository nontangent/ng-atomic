import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TextInputFieldMolecule } from './text-input-field.molecule';



@NgModule({
  declarations: [TextInputFieldMolecule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Materials
    // MatFormFieldModule,
    MatInputModule,
  ],
  exports: [TextInputFieldMolecule],
  bootstrap: [TextInputFieldMolecule],
})
export class TextInputFieldModule { }

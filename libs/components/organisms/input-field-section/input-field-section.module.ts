import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InputFieldSectionOrganism } from './input-field-section.organism';

@NgModule({
  declarations: [
    InputFieldSectionOrganism
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    InputFieldSectionOrganism
  ]
})
export class InputFieldSectionModule { }

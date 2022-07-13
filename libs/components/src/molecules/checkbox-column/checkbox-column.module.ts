import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions } from '@angular/material/checkbox';

import { CheckboxColumnMolecule } from './checkbox-column.molecule';



@NgModule({
  declarations: [
    CheckboxColumnMolecule
  ],
  imports: [
    CommonModule,
    // Materials
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [CheckboxColumnMolecule],
  providers: [
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions}
  ],
  bootstrap: [CheckboxColumnMolecule],
})
export class CheckboxColumnModule { }

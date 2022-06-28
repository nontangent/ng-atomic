import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions } from '@angular/material/checkbox';
import { ElementsModule } from '@ng-atomic/elements';

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
  exports: [
    CheckboxColumnMolecule
  ],
  providers: [
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions}
  ]
})
export class CheckboxColumnModule extends ElementsModule { }

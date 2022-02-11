import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { SmartColumnMolecule } from './smart-column.molecule';
import { SmartExpModule } from '@ng-atomic/common/pipes/smart-exp';

@NgModule({
  declarations: [
    SmartColumnMolecule,
  ],
  imports: [
    CommonModule,
    // Pipes
    SmartExpModule,
    // Materials
    MatTableModule,
  ],
  exports: [
    SmartColumnMolecule
  ]
})
export class SmartColumnModule { }

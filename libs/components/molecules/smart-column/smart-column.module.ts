import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SmartExpModule } from '@ng-atomic/common/pipes';
import { ElementsModule } from '@ng-atomic/elements';

import { SmartColumnMolecule } from './smart-column.molecule';

@NgModule({
  declarations: [
    SmartColumnMolecule,
  ],
  imports: [
    CommonModule,
    // Pipes
    SmartExpModule,
    // Materials
    MatIconModule,
    MatTableModule,
  ],
  exports: [
    SmartColumnMolecule
  ]
})
export class SmartColumnModule extends ElementsModule { }

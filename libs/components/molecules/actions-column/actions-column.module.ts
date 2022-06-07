import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ActionsColumnMolecule } from './actions-column.molecule';
import { SmartMenuButtonModule } from '@ng-atomic/components/atoms/smart-menu-button';

@NgModule({
  declarations: [
    ActionsColumnMolecule
  ],
  imports: [
    CommonModule,
    // Materials
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    // Atoms
    SmartMenuButtonModule,
  ],
  exports: [
    ActionsColumnMolecule
  ]
})
export class ActionsColumnModule { }
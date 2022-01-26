import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsColumnModule } from '@smooth/finance/components/molecules/actions-column';
import { CheckboxColumnModule } from '@smooth/finance/components/molecules/checkbox-column';
import { SmartColumnModule } from '@smooth/finance/components/molecules/smart-column';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomainModule } from '@smooth/finance/_shared/pipes/domain';

import { SmartTableOrganism } from './smart-table.organism';

@NgModule({
  declarations: [
    SmartTableOrganism,
  ],
  imports: [
    CommonModule,
    // Pipes
    DomainModule,
    // Material
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    // Molecules
    ActionsColumnModule,
    CheckboxColumnModule,
    SmartColumnModule,
  ],
  exports: [
    SmartTableOrganism
  ]
})
export class SmartTableModule { }

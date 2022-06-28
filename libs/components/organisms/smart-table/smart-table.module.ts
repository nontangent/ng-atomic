import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomainModule } from '@ng-atomic/common/pipes';
import { ActionsColumnModule } from '@ng-atomic/components/molecules/actions-column';
import { CheckboxColumnModule } from '@ng-atomic/components/molecules/checkbox-column';
import { SmartColumnModule } from '@ng-atomic/components/molecules/smart-column';
import { ElementsModule } from '@ng-atomic/elements';

import { SmartTableOrganism } from './smart-table.organism';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SmartTableOrganism,
  ],
  imports: [
    BrowserModule,
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
export class SmartTableModule extends ElementsModule { }

import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SmartExpModule } from '@ng-atomic/common/pipes/smart-exp';
import { SmartColumnMolecule } from './smart-column.molecule';
import { DataAccessorPipe } from '@ng-atomic/common/pipes/data-accessor';

@NgModule({
  declarations: [
    SmartColumnMolecule,
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    // Pipes
    SmartExpModule,
    DataAccessorPipe,
    // Materials
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
  ],
  exports: [SmartColumnMolecule],
  bootstrap: [SmartColumnMolecule],
})
export class SmartColumnModule { }

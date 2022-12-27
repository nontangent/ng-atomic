import { ChangeDetectionStrategy, Input, Output, EventEmitter, Component, ViewEncapsulation, Optional, Inject, inject, ViewChild } from '@angular/core';
import { MatColumnDef, MatTextColumn } from '@angular/material/table';

@Component({
  selector: 'molecules-smart-column',
  templateUrl: './smart-column.molecule.html',
  styleUrls: ['./smart-column.molecule.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SmartColumnMolecule<T> extends MatTextColumn<T> {

  @Input()
  sort: 'asc' | 'desc' | 'none' = 'none';

  @Output()
  headerClick = new EventEmitter<void>();

  text = 'copy';

  copied() {
    this.text = 'copied!';
    setTimeout(() => this.text = 'copy', 1000);
  }
}

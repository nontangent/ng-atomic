import { ChangeDetectionStrategy, Input, Output, EventEmitter, Component, ViewEncapsulation } from '@angular/core';
import { MatTextColumn } from '@angular/material/table';

@Component({
  selector: 'molecules-smart-column',
  templateUrl: './smart-column.molecule.html',
  styleUrls: ['./smart-column.molecule.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SmartColumnMolecule<T> extends MatTextColumn<T> {
  override dataAccessor = (): string => {
    throw new Error('dataAccessor is not allowed');
  };
  
  @Input()
  sort: 'asc' | 'desc' | 'none' = 'none';

  @Output()
  headerClick = new EventEmitter<void>();

}

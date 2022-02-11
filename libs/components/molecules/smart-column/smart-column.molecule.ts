import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatTextColumn } from '@angular/material/table';
// TODO(nontangent): 依存を引き剥がす
import { toObject } from '@ng-atomic/common/utils';
import { flatten } from 'flat';

@Component({
  selector: 'molecules-smart-column',
  templateUrl: './smart-column.molecule.html',
  styleUrls: ['./smart-column.molecule.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SmartColumnMolecule<T> extends MatTextColumn<T> {
  dataAccessor = (data: any, name: string): string => {
    return name.includes('.') ? flatten(toObject(data))?.[name] : data?.[name];
  }
}

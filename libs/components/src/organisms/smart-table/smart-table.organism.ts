import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Actions, Action } from '@ng-atomic/common/models';

interface Sort {
  key?: string;
  order?: 'desc' | 'asc';
}

@Component({
  selector: 'organisms-smart-table',
  templateUrl: './smart-table.organism.html',
  styleUrls: ['./smart-table.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'organism'}
})
export class SmartTableOrganism<Item extends object> {

  @Input('columns')
  _columns: (keyof Item)[] = [];

  get columns(): (keyof Item | string)[] {
    return [...this._columns];
  }

  @Input()
  items: Item[] = [];

  @Input()
  itemActions: Actions = () => [];

  @Input()
  pageSize: number = 0;

  @Input()
  selectedIdSet = new Set<string>();

  @Input()
  sort: Sort = {};

  @Output()
  action = new EventEmitter<Action>();

  @Output()
  headerClick = new EventEmitter<string>();
  
  @Output()
  checkboxClick = new EventEmitter<[Item, boolean]>();

  @Output()
  pageChange = new EventEmitter();

  @Output()
  itemCheck = new EventEmitter<[Item, boolean]>();
  
  protected trackByColumnName = (columnName: string) => columnName;
}

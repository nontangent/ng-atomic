import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action, ActionItem } from '@ng-atomic/common/models';


@Component({
  selector: 'organisms-smart-table',
  templateUrl: './smart-table.organism.html',
  styleUrls: ['./smart-table.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'organism'}
})
export class SmartTableOrganism<Item extends object> {

  @Input()
  columns: (keyof Item)[] = [];

  get displayedColumns(): (keyof Item | string)[] {
    return [...this.columns];
  }

  @Input()
  items: Item[] = [];

  @Input()
  patientsSize: number = 0;

  @Input()
  pageSize: number = 0;

  @Input()
  menuItems: ActionItem[] = [];

  @Input()
  selectedIdSet = new Set<string>();

  @Input()
  sortKey?: string;

  @Input()
  sortOrder?: 'asc' | 'desc';

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
  
  trackByColumnName = (columnName: string) => columnName;
}

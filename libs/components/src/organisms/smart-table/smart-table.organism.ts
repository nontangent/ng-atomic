import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionItem } from '@ng-atomic/common/models';


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
  actionItems: ActionItem[] = [];

  @Input()
  selectedIdSet = new Set<string>();

  @Output()
  actionItemClick = new EventEmitter<[ActionItem, Item]>();
  
  @Output()
  checkboxClick = new EventEmitter<[Item, boolean]>();

  @Output()
  pageChange = new EventEmitter();

  @Output()
  itemCheck = new EventEmitter<[Item, boolean]>();
  
}

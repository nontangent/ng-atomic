import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { Action } from '@ng-atomic/common/models';
import { DataAccessor, DATA_ACCESSOR, defaultDataAccessor } from '@ng-atomic/common/pipes/data-accessor';

export enum ActionId {
  CLICK_ITEM = '[@ng-atomic/components/organisms/smart-list] Click Item',
}

@Component({
  selector: 'organisms-smart-list',
  templateUrl: './smart-list.organism.html',
  styleUrls: ['./smart-list.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartListOrganism<T> {

  constructor(
    @Optional() @Inject(DATA_ACCESSOR) private dataAccessor: DataAccessor<T>
  ) {
    this.dataAccessor ??= defaultDataAccessor;
  }

  statusAccessor = (data) => data['status'];

  @Input()
  items: T[] = [];

  @Output()
  action = new EventEmitter<Action>();

  get statusMap() {
    return this.items.reduce((acc, item) => {
      const key = this.dataAccessor(item, '__status');
      acc[key] ??= [],
      acc[key].push(item);
      return acc;
    }, {} as { [id: string]: any[] });
  }

  get statuses() {
    return Object.keys(this.statusMap);
  }

  protected onItemClick(item: T) {
    this.action.emit({
      id: ActionId.CLICK_ITEM,
      payload: item,
    });
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'organisms-smart-list',
  templateUrl: './smart-list.organism.html',
  styleUrls: ['./smart-list.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartListOrganism<T> {

  statusAccessor = (data) => data['status'];

  @Input()
  items: T[] = [];

  get statusMap() {
    return this.items.reduce((acc, item) => {
      const key = this.statusAccessor(item);
      acc[key] ??= [],
      acc[key].push(item);
      return acc;
    }, {} as { [id: string]: any[] });
  }

  get statuses() {
    return Object.keys(this.statusMap);
  }
}

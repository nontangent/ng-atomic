import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'organisms-navigation-list',
  templateUrl: './navigation-list.organism.html',
  styleUrls: ['./navigation-list.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationListOrganism {
  @Input()
  items: ActionItem[] = [];

  @Output()
  action = new EventEmitter<string>();
}

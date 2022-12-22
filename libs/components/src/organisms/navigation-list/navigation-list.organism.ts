import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Action, ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'organisms-navigation-list',
  templateUrl: './navigation-list.organism.html',
  styleUrls: ['./navigation-list.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationListOrganism {
  @Input()
  items: ActionItem<string>[] = [];

  @Output()
  action = new EventEmitter<Action>();
}

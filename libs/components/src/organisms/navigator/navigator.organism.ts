import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action, ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'organisms-navigator',
  templateUrl: './navigator.organism.html',
  styleUrls: ['./navigator.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigatorOrganism {

  @Input()
  title?: string;

  @Input()
  description?: string;

  @Input()
  rightItems: ActionItem[] = [];

  @Input()
  leftItems: ActionItem[] = [];

  @Output()
  action = new EventEmitter<Action>();

}

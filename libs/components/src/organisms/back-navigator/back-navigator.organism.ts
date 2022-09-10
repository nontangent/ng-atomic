import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action, ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'organisms-back-navigator',
  templateUrl: './back-navigator.organism.html',
  styleUrls: ['./back-navigator.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackNavigatorOrganism {

  @Input()
  canBack = true;

  @Input()
  title?: string;

  @Input()
  description?: string;

  @Input()
  items: ActionItem[] = [];

  @Output()
  backButtonClick = new EventEmitter<void>();

  @Output()
  action = new EventEmitter<Action>();

}

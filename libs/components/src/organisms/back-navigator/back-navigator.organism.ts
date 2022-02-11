import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionItem, ActionItemEvent } from '@ng-atomic/common/models';

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
  actionItems: ActionItem[] = [];

  @Output()
  backButtonClick = new EventEmitter<void>();

  @Output()
  actionItemClick = new EventEmitter<ActionItemEvent>();

}

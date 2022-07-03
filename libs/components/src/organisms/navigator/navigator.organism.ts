import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionItem, ActionItemEvent } from '@ng-atomic/common/models';

@Component({
  selector: 'organisms-navigator',
  templateUrl: './navigator.organism.html',
  styleUrls: ['./navigator.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigatorOrganism {

  @Input()
  canBack = true;

  @Input()
  title?: string;

  @Input()
  description?: string;

  @Input()
  actionItems: ActionItem[] = [];

  @Output()
  backButtonClick = new EventEmitter<void>();

  @Output()
  actionItemClick = new EventEmitter<ActionItemEvent>();

}

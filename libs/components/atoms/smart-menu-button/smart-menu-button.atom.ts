import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'atoms-smart-menu-button',
  templateUrl: './smart-menu-button.atom.html',
  styleUrls: ['./smart-menu-button.atom.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartMenuButtonAtom {
  @Input()
  actionItems: ActionItem[] = [];

  @Output()
  actionItemClick = new EventEmitter<ActionItem>();
}

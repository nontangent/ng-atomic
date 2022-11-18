import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action, ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'atoms-smart-menu-button',
  templateUrl: './smart-menu-button.atom.html',
  styleUrls: ['./smart-menu-button.atom.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SmartMenuButtonAtom {
  @Input()
  items: ActionItem[] = [];

  @Output()
  action = new EventEmitter<Action>();

  trackByItemId = (index: number, item: ActionItem): string => item.id;
}

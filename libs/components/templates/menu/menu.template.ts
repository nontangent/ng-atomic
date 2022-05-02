import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'templates-menu',
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.template.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuTemplate {

  @Input()
  actionItems: ActionItem[] = [];

  @Output()
  actionItemClick = new EventEmitter<[ActionItem]>();

}

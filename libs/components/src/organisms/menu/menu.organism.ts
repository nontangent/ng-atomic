import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ActionItem } from '@smooth/domain/models';

@Component({
  selector: 'organisms-menu',
  templateUrl: './menu.organism.html',
  styleUrls: ['./menu.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuOrganism {
  @Input()
  actionItems: ActionItem[] = [];

  @Output()
  actionItemClick = new EventEmitter<[ActionItem]>();

}

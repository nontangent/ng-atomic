import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'organisms-action-buttons-section',
  templateUrl: './action-buttons-section.organism.html',
  styleUrls: ['./action-buttons-section.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'organism section'},
})
export class ActionButtonsSectionOrganism {
  @Input()
  actionItems: ActionItem[] = [];

  @Output()
  actionItemClick = new EventEmitter<[ActionItem]>();

  trackById = (item: ActionItem) => item.id;
}

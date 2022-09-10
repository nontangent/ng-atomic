import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActionItem } from '@ng-atomic/common/models';


@Component({
  selector: 'organisms-top-navigator',
  templateUrl: './top-navigator.organism.html',
  styleUrls: ['./top-navigator.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavigatorOrganism {

  @Input()
  title?: string;

  @Input()
  items: ActionItem[] = [];

  @Output()
  action = new EventEmitter<ActionItem>();
  
  id = (item: {id: string}) => item.id;

}

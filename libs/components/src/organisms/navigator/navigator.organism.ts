import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '@ng-atomic/common/models';

@Component({
  selector: 'organisms-navigator',
  templateUrl: './navigator.organism.html',
  styleUrls: ['./navigator.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigatorOrganism {
  @Input()
  startActions: Action[] = [];

  @Input()
  endActions: Action[] = [];

  @Output()
  action = new EventEmitter<Action>();
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'organisms-back-navigator',
  templateUrl: './back-navigator.organism.html',
  styleUrls: ['./back-navigator.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackNavigatorOrganism {

  @Input()
  title?: string;

  menuItems = [];

  @Output()
  backButtonClick = new EventEmitter<void>();

}

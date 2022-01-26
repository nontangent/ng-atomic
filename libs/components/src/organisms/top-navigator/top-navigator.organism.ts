import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface MenuItem {
  id: number | string;
  name: string;
}

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
  menuItems: MenuItem[] = [];

  @Output()
  menuItemClick = new EventEmitter<MenuItem>();
  
  id = (item: {id: string}) => item.id;

}

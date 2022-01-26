import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'organisms-back-navigator',
  templateUrl: './back-navigator.organism.html',
  styleUrls: ['./back-navigator.organism.scss']
})
export class BackNavigatorOrganism implements OnInit {

  @Input()
  title?: string;

  menuItems = [];

  @Output()
  backButtonClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}

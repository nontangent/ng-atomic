import { Component, OnInit } from '@angular/core';
import { ElementsLoader } from '@ng-atomic/components/elements.loader';
import { ActionItem } from '@ng-atomic/common/models';

const ELEMENTS = [
  'atoms-chips-input',
  // 'atoms-smart-menu-button',
];

@Component({
  selector: 'platform-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';

  actionItems: ActionItem[] = [
    { id: 'test', name: 'test' },
    { id: 'test2', name: 'test' },
  ];

  constructor(private loader: ElementsLoader) { }

  ngOnInit(): void {
    Promise.all(ELEMENTS.map(name => this.loader.load(name)));
  }

  onAction(event: [ActionItem]): void {
    console.debug('event:', event);
  }
}

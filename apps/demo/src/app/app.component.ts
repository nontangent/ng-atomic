import { Component } from '@angular/core';
import { ActionItem } from '@ng-atomic/common/models';


@Component({
  selector: 'platform-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';

  actionItems: ActionItem[] = [
    { id: 'test', name: 'test' },
    { id: 'test2', name: 'test' },
  ];

  onAction(event: [ActionItem]): void {
    console.debug('event:', event);
  }
}

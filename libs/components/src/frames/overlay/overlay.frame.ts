import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './overlay.animations';

@Component({
  selector: 'frames-overlay',
  templateUrl: './overlay.frame.html',
  styleUrls: ['./overlay.frame.scss'],
  animations: [slideInAnimation],
})
export class OverlayFrame {
  
  @Input()
  outlet?: RouterOutlet | null = null;

  @Input()
  isLoading: boolean = false;

  prepareRoute(outlet: RouterOutlet | null | undefined) {
    return outlet?.activatedRouteData?.['page'];
  }

}

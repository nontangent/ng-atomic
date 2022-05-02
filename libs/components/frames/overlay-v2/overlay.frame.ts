import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OVERLAY_ANIMATION } from './overlay.animations';

@Component({
  selector: 'frames-overlay',
  templateUrl: './overlay.frame.html',
  styleUrls: ['./overlay.frame.scss'],
  animations: [OVERLAY_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayFrame {
  @Input()
  hasNext = false;
}

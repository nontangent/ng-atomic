import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'frames-auto-layout',
  templateUrl: './auto-layout.frame.html',
  styleUrls: ['./auto-layout.frame.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoLayoutFrame { }

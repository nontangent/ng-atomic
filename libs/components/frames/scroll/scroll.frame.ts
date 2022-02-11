import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'frames-scroll',
  templateUrl: './scroll.frame.html',
  styleUrls: ['./scroll.frame.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollFrame { }

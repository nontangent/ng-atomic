import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'frames-card',
  templateUrl: './card.frame.html',
  styleUrls: ['./card.frame.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFrame { }

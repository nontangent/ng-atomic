import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'templates-entrance',
  templateUrl: './entrance.template.html',
  styleUrls: ['./entrance.template.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntranceTemplate {
  @Output()
  signInWithGoogleButtonClick = new EventEmitter<void>();
}

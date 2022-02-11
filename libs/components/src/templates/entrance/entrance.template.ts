import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'templates-entrance',
  templateUrl: './entrance.template.html',
  styleUrls: ['./entrance.template.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntranceTemplate {
  @Input()
  isEmailSectionShown = true;

  @Input()
  isPasswordSectionShown = true;

  @Output()
  signInWithGoogleButtonClick = new EventEmitter<void>();
}

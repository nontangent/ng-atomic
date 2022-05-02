import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl} from '@ngneat/reactive-forms';

@Component({
  selector: 'templates-entrance',
  templateUrl: './entrance.template.html',
  styleUrls: ['./entrance.template.scss'],
  host: {class: 'template'},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntranceTemplate {
  @Input()
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  @Input()
  isEmailSectionShown = true;

  @Input()
  isPasswordSectionShown = true;

  @Input()
  actionItems = [];

  @Output()
  submitButtonClick = new EventEmitter<void>();

  @Output()
  signInWithGoogleButtonClick = new EventEmitter<void>();
}

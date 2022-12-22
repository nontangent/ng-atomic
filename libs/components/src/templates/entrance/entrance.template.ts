import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '@ng-atomic/common/models';
import { FormGroup, FormControl} from '@ngneat/reactive-forms';

export enum ActionId {
  SIGN_IN = '[@ng-atomic/components] Sign In',
  SIGN_IN_WITH_GOOGLE = '[@ng-atomic/components] Sign In With Google',
  SIGN_IN_WITH_TWITTER = '[@ng-atomic/components] Sign In With Twitter',
}

export const Actions: Action[] = [
  {
    id: ActionId.SIGN_IN,
    name: 'Sign In',
    icon: 'login',
  },
  {
    id: ActionId.SIGN_IN_WITH_GOOGLE,
    name: 'Sign In With Google',
    icon: 'google',
  },
  {
    id: ActionId.SIGN_IN_WITH_TWITTER,
    name: 'Sign In With Twitter',
    icon: 'twitter',
  },
];

@Component({
  selector: 'templates-entrance',
  templateUrl: './entrance.template.html',
  styleUrls: ['./entrance.template.scss'],
  host: {class: 'template'},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntranceTemplate {
  protected ActionId = ActionId

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
  actions = Actions;

  @Output()
  action = new EventEmitter<Action>()
}

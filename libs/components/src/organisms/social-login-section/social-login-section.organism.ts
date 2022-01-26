import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'organisms-social-login-section',
  templateUrl: './social-login-section.organism.html',
  styleUrls: ['./social-login-section.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLoginSectionOrganism {

  @Output()
  signInWithGoogleButtonClick = new EventEmitter<void>();
  
}

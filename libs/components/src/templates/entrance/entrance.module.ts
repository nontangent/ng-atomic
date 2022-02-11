import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonsSectionModule } from '@ng-atomic/components/organisms/action-buttons-section';
import { HeadingModule } from '@ng-atomic/components/organisms/heading';
import { InputFieldSectionModule } from '@ng-atomic/components/organisms/input-field-section';
import { SocialLoginSectionModule } from '@ng-atomic/components/organisms/social-login-section';
import { AutoLayoutModule } from '@ng-atomic/components/frames/auto-layout';
import { CardModule } from '@ng-atomic/components/frames/card';
import { EntranceTemplate } from './entrance.template';


@NgModule({
  declarations: [
    EntranceTemplate
  ],
  imports: [
    CommonModule,
    // Frames
    AutoLayoutModule,
    CardModule,
    // Organisms
    ActionButtonsSectionModule,
    HeadingModule,
    InputFieldSectionModule,
    SocialLoginSectionModule,
  ],
  exports: [
    EntranceTemplate
  ]
})
export class EntranceModule { }

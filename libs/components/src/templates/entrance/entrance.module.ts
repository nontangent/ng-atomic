import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonsSectionModule } from '@ng-atomic/components/organisms/action-buttons-section';
import { HeadingModule } from '@ng-atomic/components/organisms/heading';
import { TextInputSectionModule } from '@ng-atomic/components/organisms/text-input-section';
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
    SocialLoginSectionModule,
    TextInputSectionModule,
  ],
  exports: [
    EntranceTemplate
  ],
  bootstrap: [
    EntranceTemplate,
  ]
})
export class EntranceModule { }

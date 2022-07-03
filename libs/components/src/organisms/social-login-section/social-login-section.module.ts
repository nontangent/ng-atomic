import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SocialLoginSectionOrganism } from './social-login-section.organism';



@NgModule({
  declarations: [
    SocialLoginSectionOrganism
  ],
  imports: [
    CommonModule,
    // Material
    MatButtonModule,
  ],
  exports: [
    SocialLoginSectionOrganism
  ]
})
export class SocialLoginSectionModule { }

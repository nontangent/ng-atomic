import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SocialLoginSectionOrganism } from './social-login-section.organism';
import { BrowserModule } from '@angular/platform-browser';
import { ElementsModule } from '@ng-atomic/elements';



@NgModule({
  declarations: [
    SocialLoginSectionOrganism
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // Material
    MatButtonModule,
  ],
  exports: [
    SocialLoginSectionOrganism
  ]
})
export class SocialLoginSectionModule extends ElementsModule { }

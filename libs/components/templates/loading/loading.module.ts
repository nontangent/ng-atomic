import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ElementsModule } from '@ng-atomic/elements';
import { BrowserModule } from '@angular/platform-browser';

import { LoadingTemplate } from './loading.template';


@NgModule({
  declarations: [
    LoadingTemplate
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // Materials
    MatProgressSpinnerModule,
  ],
  exports: [
    LoadingTemplate
  ]
})
export class LoadingModule extends ElementsModule { }

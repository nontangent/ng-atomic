import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingTemplate } from './loading.template';


@NgModule({
  declarations: [
    LoadingTemplate
  ],
  imports: [
    CommonModule,
    // Materials
    MatProgressSpinnerModule,
  ],
  exports: [
    LoadingTemplate
  ],
  bootstrap: [
    LoadingTemplate,
  ],
})
export class LoadingModule { }

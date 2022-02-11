import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayFrame } from './overlay.frame';

@NgModule({
  declarations: [OverlayFrame],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    OverlayFrame
  ]
})
export class OverlayModule { }


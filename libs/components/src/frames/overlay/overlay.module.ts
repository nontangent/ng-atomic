import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayFrame } from './overlay.frame';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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


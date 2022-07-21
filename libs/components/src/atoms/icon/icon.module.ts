import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconAtom } from './icon.atom';



@NgModule({
  declarations: [
    IconAtom
  ],
  imports: [
    CommonModule,
    // Material
    MatIconModule,
  ],
  exports: [
    IconAtom
  ]
})
export class IconModule { }

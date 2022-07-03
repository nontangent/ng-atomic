import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { SmartMenuButtonAtom } from './smart-menu-button.atom';


@NgModule({
  declarations: [SmartMenuButtonAtom],
  imports: [
    CommonModule,
    // Material
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [SmartMenuButtonAtom]
})
export class SmartMenuButtonModule { }
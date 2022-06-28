import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ElementsModule } from '@ng-atomic/elements';
import { BrowserModule } from '@angular/platform-browser';

import { SmartMenuButtonAtom } from './smart-menu-button.atom';


@NgModule({
  declarations: [SmartMenuButtonAtom],
  imports: [
    BrowserModule,
    CommonModule,
    // Material
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [SmartMenuButtonAtom]
})
export class SmartMenuButtonModule extends ElementsModule { }
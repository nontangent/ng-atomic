import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DrawerFrame } from './drawer.frame';



@NgModule({
  declarations: [DrawerFrame],
  imports: [
    CommonModule,
    MatSidenavModule,
  ],
  exports: [DrawerFrame]
})
export class DrawerModule { }
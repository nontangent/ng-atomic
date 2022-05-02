import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerFrame } from './drawer.frame';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [DrawerFrame],
  imports: [
    CommonModule,
    MatSidenavModule,
  ],
  exports: [DrawerFrame]
})
export class DrawerModule { }

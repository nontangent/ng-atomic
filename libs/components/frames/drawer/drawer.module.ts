import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ElementsModule } from '@ng-atomic/elements';

import { DrawerFrame } from './drawer.frame';



@NgModule({
  declarations: [DrawerFrame],
  imports: [
    CommonModule,
    MatSidenavModule,
  ],
  exports: [DrawerFrame]
})
export class DrawerModule extends ElementsModule { }
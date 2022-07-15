import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MenuOrganism } from './menu.organism';

@NgModule({
  declarations: [MenuOrganism],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  exports: [MenuOrganism]
})
export class MenuModule { }
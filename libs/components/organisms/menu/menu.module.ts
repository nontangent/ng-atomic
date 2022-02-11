import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuOrganism } from './menu.organism';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

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

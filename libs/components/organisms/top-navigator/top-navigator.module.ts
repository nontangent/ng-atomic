import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigatorOrganism } from './top-navigator.organism';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    TopNavigatorOrganism
  ],
  imports: [
    CommonModule,
    // Material
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  exports: [
    TopNavigatorOrganism
  ]
})
export class TopNavigatorModule { }

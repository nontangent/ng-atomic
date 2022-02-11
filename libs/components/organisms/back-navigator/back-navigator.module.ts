import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { BackNavigatorOrganism } from './back-navigator.organism';

@NgModule({
  declarations: [
    BackNavigatorOrganism
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
    BackNavigatorOrganism
  ]
})
export class BackNavigatorModule { }

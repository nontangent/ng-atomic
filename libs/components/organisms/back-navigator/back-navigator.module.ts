import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SmartMenuButtonModule } from '@ng-atomic/components/atoms/smart-menu-button';

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
    // Atoms
    SmartMenuButtonModule,
  ],
  exports: [
    BackNavigatorOrganism
  ]
})
export class BackNavigatorModule { }

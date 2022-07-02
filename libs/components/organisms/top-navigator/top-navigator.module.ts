import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SmartMenuButtonModule } from '@ng-atomic/components/atoms/smart-menu-button';
import { TopNavigatorOrganism } from './top-navigator.organism';


@NgModule({
  declarations: [
    TopNavigatorOrganism
  ],
  imports: [
    CommonModule,
    // Material
    MatToolbarModule,
    MatMenuModule,
    // Atoms
    SmartMenuButtonModule,
  ],
  exports: [
    TopNavigatorOrganism
  ]
})
export class TopNavigatorModule { }

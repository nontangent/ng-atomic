import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SmartMenuButtonModule } from '@ng-atomic/components/atoms/smart-menu-button';
import { ElementsModule } from '@ng-atomic/elements';
import { BrowserModule } from '@angular/platform-browser';
import { TopNavigatorOrganism } from './top-navigator.organism';


@NgModule({
  declarations: [
    TopNavigatorOrganism
  ],
  imports: [
    BrowserModule,
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
export class TopNavigatorModule extends ElementsModule { }

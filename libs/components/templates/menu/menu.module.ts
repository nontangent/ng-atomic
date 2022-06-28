import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule as MenuOrganismModule } from '@ng-atomic/components/organisms/menu';
import { ElementsModule } from '@ng-atomic/elements';

import { MenuTemplate } from './menu.template';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [MenuTemplate],
  imports: [
    BrowserModule,
    CommonModule,
    // Organisms
    MenuOrganismModule,
  ],
  exports: [MenuTemplate]
})
export class MenuModule extends ElementsModule { }


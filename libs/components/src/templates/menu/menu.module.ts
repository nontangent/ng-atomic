import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule as MenuOrganismModule } from '@ng-atomic/components/organisms/menu';

import { MenuTemplate } from './menu.template';


@NgModule({
  declarations: [MenuTemplate],
  imports: [
    CommonModule,
    // Organisms
    MenuOrganismModule,
  ],
  exports: [MenuTemplate],
  bootstrap: [MenuTemplate],
})
export class MenuModule { }


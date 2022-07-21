import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationListModule } from '@ng-atomic/components/organisms/navigation-list';

import { MenuTemplate } from './menu.template';


@NgModule({
  declarations: [MenuTemplate],
  imports: [
    CommonModule,
    // Organisms
    NavigationListModule,
  ],
  exports: [MenuTemplate],
  bootstrap: [MenuTemplate],
})
export class MenuModule { }


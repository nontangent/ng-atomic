import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { IconModule } from '@ng-atomic/components/atoms/icon';

import { NavigationListItemMolecule } from './navigation-list-item.molecule';



@NgModule({
  declarations: [
    NavigationListItemMolecule
  ],
  imports: [
    CommonModule,
    // Materials
    MatListModule,
    // Atoms
    IconModule,
  ],
  exports: [
    NavigationListItemMolecule
  ]
})
export class NavigationListItemModule { }

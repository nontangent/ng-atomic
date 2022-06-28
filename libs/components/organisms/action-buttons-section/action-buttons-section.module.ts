import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ElementsModule } from '@ng-atomic/elements';

import { ActionButtonsSectionOrganism } from './action-buttons-section.organism';

@NgModule({
  declarations: [
    ActionButtonsSectionOrganism
  ],
  imports: [
    CommonModule,
    // Materials
    MatButtonModule,
  ],
  exports: [
    ActionButtonsSectionOrganism
  ]
})
export class ActionButtonsSectionModule extends ElementsModule { }

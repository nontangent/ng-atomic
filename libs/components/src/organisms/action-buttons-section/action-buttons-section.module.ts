import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionButtonsSectionOrganism } from './action-buttons-section.organism';

import { MatButtonModule } from '@angular/material/button';

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
export class ActionButtonsSectionModule { }

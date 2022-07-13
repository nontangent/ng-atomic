import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  bootstrap: [
    ActionButtonsSectionOrganism,
  ],
})
export class ActionButtonsSectionModule { }

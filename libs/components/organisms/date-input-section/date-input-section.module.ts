import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputFieldModule } from '@ng-atomic/components/molecules/date-input-field';
import { ElementsModule } from '@ng-atomic/elements';

import { DateInputSectionOrganism } from './date-input-section.organism';

@NgModule({
  declarations: [
    DateInputSectionOrganism
  ],
  imports: [
    CommonModule,
    DateInputFieldModule,
  ],
  exports: [
    DateInputSectionOrganism
  ],
})
export class DateInputSectionModule extends ElementsModule { }

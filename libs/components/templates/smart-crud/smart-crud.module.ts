import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollModule } from '@ng-atomic/components/frames/scroll';
import { AutoLayoutModule } from '@ng-atomic/components/frames/auto-layout';
import { ActionButtonsSectionModule } from '@ng-atomic/components/organisms/action-buttons-section';
import { BackNavigatorModule } from '@ng-atomic/components/organisms/back-navigator';
import { InputFieldSectionModule } from '@ng-atomic/components/organisms/input-field-section';
import { DateInputSectionModule } from '@ng-atomic/components/organisms/date-input-section';
import { SelectInputSectionModule } from '@ng-atomic/components/organisms/select-input-section';
import { SmartFieldModule } from '@ng-atomic/common/pipes';
import { DomainModule } from '@ng-atomic/common/pipes';

import { SmartCrudTemplate } from './smart-crud.template';


@NgModule({
  declarations: [
    SmartCrudTemplate
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Pipes
    DomainModule,
    SmartFieldModule,
    // Frames
    AutoLayoutModule,
    ScrollModule,
    // Organisms
    ActionButtonsSectionModule,
    BackNavigatorModule,
    DateInputSectionModule,
    InputFieldSectionModule,
    SelectInputSectionModule,
  ],
  exports: [
    SmartCrudTemplate
  ]
})
export class SmartCrudModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollModule } from '@ng-atomic/components/frames/scroll';
import { AutoLayoutModule } from '@ng-atomic/components/frames/auto-layout';
import { HeaderModule } from '@ng-atomic/components/molecules/header';
import { ActionButtonsSectionModule } from '@ng-atomic/components/organisms/action-buttons-section';
import { NavigatorModule } from '@ng-atomic/components/organisms/navigator';
import { TextInputSectionModule } from '@ng-atomic/components/organisms/text-input-section';
import { DateInputSectionModule } from '@ng-atomic/components/organisms/date-input-section';
import { SelectInputSectionModule } from '@ng-atomic/components/organisms/select-input-section';
import { SmartFieldModule } from '@ng-atomic/common/pipes/smart-field';
import { DomainModule } from '@ng-atomic/common/pipes/domain';

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
    NavigatorModule,
    DateInputSectionModule,
    TextInputSectionModule,
    SelectInputSectionModule,
    // Molecules
    HeaderModule,
  ],
  exports: [
    SmartCrudTemplate
  ],
  providers: [],
  bootstrap: [SmartCrudTemplate],
})
export class SmartCrudModule { }

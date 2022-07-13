import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaFieldModule } from '@ng-atomic/components/molecules/textarea-field';

import { TextareaSectionOrganism } from './textarea-section.organism';


@NgModule({
  declarations: [TextareaSectionOrganism],
  imports: [
    CommonModule,
    // Molecules
    TextareaFieldModule,
  ],
  exports: [TextareaSectionOrganism]
})
export class TextareaSectionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaFieldModule } from '@ng-atomic/components/molecules/textarea-field';
import { ElementsModule } from '@ng-atomic/elements';

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
export class TextareaSectionModule extends ElementsModule { }

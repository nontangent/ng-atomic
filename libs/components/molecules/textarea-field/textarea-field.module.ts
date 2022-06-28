import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ElementsModule } from '@ng-atomic/elements';

import { TextareaFieldMolecule } from './textarea-field.molecule';


@NgModule({
  declarations: [TextareaFieldMolecule],
  imports: [
    CommonModule,
    // Material
    MatInputModule,
  ],
  exports: [TextareaFieldMolecule]
})
export class TextareaFieldModule extends ElementsModule { }

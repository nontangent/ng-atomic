import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputFieldModule } from '@ng-atomic/components/molecules/text-input-field';
import { TextInputSectionOrganism } from './text-input-section.organism';
import { BrowserModule } from '@angular/platform-browser';
import { ElementsModule } from '@ng-atomic/elements';


@NgModule({
  declarations: [
    TextInputSectionOrganism
  ],
  imports: [
    BrowserModule,
    CommonModule,
    // Molecules
    TextInputFieldModule,
  ],
  exports: [
    TextInputSectionOrganism
  ]
})
export class TextInputSectionModule extends ElementsModule { }

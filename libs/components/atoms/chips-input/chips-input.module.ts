import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ElementsModule } from '@ng-atomic/elements';
import { BrowserModule } from '@angular/platform-browser';

import { ChipsInputAtom } from './chips-input.atom';
import { ChipsManager } from './chips.manager';



@NgModule({
  declarations: [ChipsInputAtom],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    // Materials
    MatChipsModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [ChipsInputAtom],
  providers: [ChipsManager],
})
export class ChipsInputModule extends ElementsModule { }
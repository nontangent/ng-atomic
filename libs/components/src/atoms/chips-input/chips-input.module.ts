import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChipsInputAtom } from './chips-input.atom';


@NgModule({
  declarations: [
    ChipsInputAtom
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Materials
    MatChipsModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    ChipsInputAtom
  ],
  bootstrap: [ChipsInputAtom],
})
export class ChipsInputModule { }
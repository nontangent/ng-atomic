import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDayjsDateModule, MAT_DAYJS_JP_PROVIDERS } from '@ng-atomic/common/utils';
import { DateInputFieldMolecule } from './date-input-field.molecule';



@NgModule({
  declarations: [DateInputFieldMolecule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatDayjsDateModule,
  ],
  exports: [DateInputFieldMolecule],
  bootstrap: [DateInputFieldMolecule],
  // providers: [...MAT_DAYJS_JP_PROVIDERS],
})
export class DateInputFieldModule { }

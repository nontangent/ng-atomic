import { MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'
dayjs.locale('ja');

export const MAT_DAYJS_DATE_FORMATS_FOR_JP: MatDateFormats = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

export const MAT_DAYJS_JP_PROVIDERS = [
  { provide: MAT_DATE_LOCALE, useValue: 'ja' },
  { provide: MAT_DATE_FORMATS, useValue: MAT_DAYJS_DATE_FORMATS_FOR_JP },
];

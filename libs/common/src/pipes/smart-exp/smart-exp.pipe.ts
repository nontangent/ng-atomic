import { Pipe } from '@angular/core';
import * as dayjs from 'dayjs';
import { YenPipe } from '../yen/yen.pipe';

@Pipe({
  name: 'smartExp',
  pure: true,
})
export class SmartExpPipe {
  transform(input: string | number | dayjs.Dayjs | any, key?: string): string {
    if (dayjs.isDayjs(input)) {
      return input.format('YY/MM/DD');
    } else if (Array.isArray(input)) {
      return `${input.length}個のアイテム`;
    } else if (typeof input === 'number' && input > 10_000) {
      return new YenPipe().transform(input);
    }
    return input;
  }
}
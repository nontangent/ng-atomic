import { Inject, InjectionToken, Optional, Pipe } from '@angular/core';
import * as dayjs from 'dayjs';
import { YenPipe } from '../yen/yen.pipe';

export const SMART_EXP_TRANSFORMER = new InjectionToken<SmartExpTransformer>('[@ng-atomic/common] Smart Transformer');

export type SmartExpTransformer = (input: string | number | dayjs.Dayjs | any, key?: string) => string;

export const smartExpTransformer: SmartExpTransformer = input => dayjs.isDayjs(input)
  ? input.format('YY/MM/DD')
  : Array.isArray(input) 
  ? `${input.length}個のアイテム`
  : typeof input === 'number' && input > 10_000
  ? new YenPipe().transform(input)
  : input;

@Pipe({
  name: 'smartExp',
  pure: true,
})
export class SmartExpPipe {
  constructor(
    @Optional() @Inject(SMART_EXP_TRANSFORMER) private transformer: SmartExpTransformer
  ) {
    this.transformer ??= smartExpTransformer;
  }

  transform(input: string | number | dayjs.Dayjs | any, key?: string): string {
    return this.transformer(input, key);
  }
}
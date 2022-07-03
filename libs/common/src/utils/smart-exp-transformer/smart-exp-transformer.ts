import { InjectionToken } from '@angular/core';
import dayjs from 'dayjs';
import { comma } from '../comma';

export const SMART_EXP_TRANSFORMER = new InjectionToken<SmartExpTransformer>('[@ng-atomic/common] Smart Transformer');

export type SmartExpTransformer = (input: string | number | dayjs.Dayjs | any, key?: string) => string;

// export const yenTransform = (value: number, _unit?: string): string => {
//   return value < 1 ? `${comma(value * 100)}%` : `${comma(value)}円`;
// }

export const yenTransform = (value: number, _unit?: string): string => {
  return `${comma(value)}円`;
}

export const smartExpTransformer: SmartExpTransformer = input => dayjs.isDayjs(input)
  ? input.format('YY/MM/DD')
  : Array.isArray(input) 
  ? `${input.length}個のアイテム`
  : typeof input === 'number'
  ? yenTransform(input)
  : input;
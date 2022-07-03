import { toObject, isIsoString } from '@ng-atomic/common/utils';
import dayjs from 'dayjs';
import { unflatten, flatten } from 'flat';
import { omit, pick } from 'lodash';

const isNumeric = (v: string): boolean => !isNaN(Number(v)) 

const parseQueryString = (v: string, key: string): any => key.match(/id$/i) 
  ? v
  : typeof v === 'string' && isIsoString(v) 
  ? dayjs(v) 
  : v === ''
  ? v
  : isNumeric(v)
  ? Number(v)
  : v;

export class BaseFormService {
  static fromQueryParams<T>(obj: T): object {
    return Object.entries((unflatten(obj) as any)?.form ?? {}).reduce((m, [k, v]: [string, string]) => ({
      ...m, [k]: parseQueryString(v, k),
    }), {});
  }

  static toQueryParams<T>(obj: object): T {    
    return flatten({form: Object.entries(obj).reduce((m, [k, v]) => ({
      ...m, [k]: dayjs.isDayjs(v) ? v.isValid() ? v.toISOString() : null : v,
    }), {})});
  }

  static dayjsKeys(object: object): string[] {
    return Object.entries(object).filter(([_, v]) => dayjs.isDayjs(v)).map(([k]) => k);
  }

  static toValue(object: object): object {
    const keys = this.dayjsKeys(object);
    return {...flatten(omit(toObject(object), keys)), ...pick(toObject(object), keys)};
  }

  static fromValue(value: object): object {
    const keys = this.dayjsKeys(value);
    return {...unflatten(omit(value, keys)), ...pick(value, keys)};
  }
}
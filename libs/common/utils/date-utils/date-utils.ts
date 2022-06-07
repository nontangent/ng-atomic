import dayjs from 'dayjs';

export const removeComma = (str: string) => str.replace(/\,/g, '');

export const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const DATE_REGEX = /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
const DATETIME_REGEX = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\+([+-][0-2]\d:[0-5]\d)$/;
export const isDateStr = (str: string | null): str is string => str && !!str.match(DATE_REGEX);
export const isDateTimeStr = (str: string | null): str is string => str && !!str.match(DATE_REGEX);

const ISO_REGEX = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
export const isIsoString = (str: string | null): str is string => str && !!str.match(ISO_REGEX);


export interface Timestamp {
  toDate: () => Date;
}

export function timestampToDayjs(timestamp: Timestamp | null): dayjs.Dayjs | null {
  return timestamp ? dayjs(timestamp.toDate()) : null;
}
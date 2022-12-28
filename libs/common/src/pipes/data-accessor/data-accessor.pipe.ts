import { Inject, InjectionToken, Optional, Pipe } from "@angular/core";
import { get } from 'lodash';

export type DataAccessor<T> = (obj: T, key: string) => string;
export const DATA_ACCESSOR = new InjectionToken<DataAccessor<any>>('DATA_ACCESSOR');
export const defaultDataAccessor: DataAccessor<any> = (obj, key) => get(obj, key) ?? '';

@Pipe({
  name: 'dataAccessor',
  pure: true,
  standalone: true,
})
export class DataAccessorPipe<T> {

  constructor(
    @Optional() @Inject(DATA_ACCESSOR) protected dataAccessor: DataAccessor<T>,
  ) {
    this.dataAccessor ??= defaultDataAccessor;
  }

  transform(data: T, key: string) {
    return this.dataAccessor(data, key);
  }
}

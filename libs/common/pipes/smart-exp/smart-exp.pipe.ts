import { Inject, Optional, Pipe } from '@angular/core';
import dayjs from 'dayjs';
import { SMART_EXP_TRANSFORMER, smartExpTransformer, SmartExpTransformer } from '@ng-atomic/common/utils';

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
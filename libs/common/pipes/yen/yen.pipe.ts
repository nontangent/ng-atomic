import { Pipe, PipeTransform } from '@angular/core';
import { comma } from '@ng-atomic/common/utils';

@Pipe({
  name: 'yen'
})
export class YenPipe implements PipeTransform {

  transform(value: number, _unit?: string): string {
    return value < 1 ? `${comma(value * 100)}%` : `${comma(value)}円`;
  }

}

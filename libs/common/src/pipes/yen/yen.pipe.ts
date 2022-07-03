import { Pipe, PipeTransform } from '@angular/core';
import { yenTransform } from '@ng-atomic/common/utils';

@Pipe({
  name: 'yen'
})
export class YenPipe implements PipeTransform {

  transform(value: number, _unit?: string): string {
    return yenTransform(value, _unit);
  }

}

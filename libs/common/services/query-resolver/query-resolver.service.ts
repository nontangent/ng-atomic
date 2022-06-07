import { Inject, Injectable, Optional } from "@angular/core";
import { filterByQuery } from "@ng-atomic/common/utils";
import { SmartExpTransformer, smartExpTransformer, SMART_EXP_TRANSFORMER } from '@ng-atomic/common/utils';


@Injectable({
  providedIn: 'root'
})
export class QueryResolverService {
  constructor(
    @Optional() @Inject(SMART_EXP_TRANSFORMER) private transformer?: SmartExpTransformer,
  ) {
    this.transformer ??= smartExpTransformer;
  }

  resolve<T>(items: T[], queryString: string, dlm: Record<string, string> = {}): T[] {
    // console.debug('queryString:', queryString);
    // const resolved = filterByQuery(items, queryString, dlm, this.transformer);
    // console.debug('resolved:', resolved);
    // return resolved;
    return items;
  }
}
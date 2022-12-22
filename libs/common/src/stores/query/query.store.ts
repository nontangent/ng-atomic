import { Inject, Injectable, Optional } from "@angular/core";
import { DOMAIN_LANG_MAP } from "@ng-atomic/common/pipes/domain";
import { QueryResolverService } from "@ng-atomic/common/services/query-resolver";
import { ComponentStore } from "@ngrx/component-store";

export interface QueryState {
  query: string;
}

@Injectable()
export class QueryStore<E = any> extends ComponentStore<QueryState> {
  constructor(
    protected queryResolver: QueryResolverService,
    @Optional() @Inject(DOMAIN_LANG_MAP) protected langMap: Record<string, string>,
  ) {
    super({query: ''});
    this.langMap ??= {};
  }

  get query(): string { return this.get().query; }
  query$ = this.select((state) => state.query);

  setQuery = this.updater((state, query: string) => ({...state, query}));

  resolve(entities: E[]): E[] {
    return this.queryResolver.resolve(entities, this.query, this.langMap);
  }

}
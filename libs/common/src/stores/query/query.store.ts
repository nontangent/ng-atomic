import { QueryResolverService } from "@ng-atomic/common/services/query-resolver";
import { ComponentStore } from "@ngrx/component-store";

export interface QueryState {
  query: string;
}

export abstract class QueryStore extends ComponentStore<QueryState> {
  abstract LANG_MAP: Record<string, string>;

  protected queryResolver = new QueryResolverService();

  setQuery = this.updater((state, query: string) => ({...state, query}));
  // this.queryResolver.resolve(entities, query, this.LANG_MAP))

}
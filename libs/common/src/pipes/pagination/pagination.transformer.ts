import { smartSortByTransformer } from '@ng-atomic/common/pipes/smart-sort-by';

interface Page {
  start: number;
  end: number;
  key: string;
  order: 'asc' | 'desc';
}

export type PaginationTransformer<E> = (items: E[], page: Page) => E[];

export function paginationTransformer<E>(items: E[], page: Page): E[] {
  return smartSortByTransformer(items, page.key, page.order).slice(page.start, page.end);
}

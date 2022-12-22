import { sortBy } from 'lodash';

export type SmartSortByTransformer = <T>(items: T[], key: string, order: 'asc' | 'desc') => T[];
export const smartSortByTransformer: SmartSortByTransformer = (items, key, order) => {
  return order === 'asc' ? sortBy(items, key) : sortBy(items, key).reverse();
}

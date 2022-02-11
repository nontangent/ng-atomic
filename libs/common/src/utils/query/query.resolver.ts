import { toObject } from '@nx-ddd/common/utilities/to-object';
import { flatten } from 'flat';

export const filterByQuery = <T>(items: T[], queryString: string, dlm: Record<string, string> = {}): T[] => {
  return new QueryResolver(dlm).resolve(items, queryString);
}

type QueryResolveFunc<T> = (items: T[], query: string) => T[];

class QueryResolver<T extends object = any> {
  REVERSED_MAP: Record<string, string>;

  constructor(map: Record<string, string>) {
    this.REVERSED_MAP = Object.entries(map).reduce((p, [k, v]) => ({...p, [v]: k}), {} as Record<string, string>);
  }

  resolve(items: T[], queryString: string): T[] {
    return this.resolveQueries(items, queryString.split(' ').filter(q => q.length));
  }

  resolveQueries(items: T[], queries: string[]): T[] {
    return queries.reduce((_items, query: string) => {
      if (query.includes(':')) return this.inQueryByKey(_items, query);
      if (query.includes('=')) return this.inQueryByKey(_items, query);
      if (query.includes('>')) return this.gtQueryByKey(_items, query);
      if (query.includes('<')) return this.inQueryByKey(_items, query);
      return this.inQuery(_items, query);
    }, items);
  }

  private parseQuery(query: string): [boolean, string, string] {
    const [_key, value] = query.split(':');
    return [_key.startsWith('-'), _key.startsWith('-') ? _key.slice(1) : _key, value];
  }

  private inQueryByKey: QueryResolveFunc<T> = (items, query) => {
    const [not, _key, value] = this.parseQuery(query);
    const key = this.REVERSED_MAP?.[_key] ?? _key;
    return items.filter(item => _not(_in(flatten(toObject(item as any))?.[key], value), not));
  }

  private gtQueryByKey: QueryResolveFunc<T> = (items, query) => {
    const [_key, value] = query.split('>');
    const key = this.REVERSED_MAP?.[_key] ?? _key;
    return items.filter(item => _gt(flatten(toObject(item as any))?.[key], value));
  }

  private inQuery: QueryResolveFunc<T> = (items, query) => {
    return items.filter(item => Object.values(flatten(toObject(item as T))).some(value => _in(value, query)));
  }
}

const _not = (bool: boolean, not: boolean): boolean => {
  return not ? !bool : bool;
}

const _in = (value: any, query: string) => {
  return typeof value === 'string' ? value?.includes(query) : false;
}

const _gt = (value: any, query: string) => {
  return typeof value === 'string' 
    ? parseFloat(value) > parseFloat(query) 
    : typeof value === 'number'
    ? value > parseFloat(query)
    : false;
}
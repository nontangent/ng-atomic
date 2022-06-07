import { flatten } from 'flat';
import { smartExpTransformer, SmartExpTransformer } from '../smart-exp-transformer';
import { toObject } from '../to-object';
import dayjs from 'dayjs';

export const filterByQuery = <T>(
  items: T[], 
  queryString: string, 
  dlm: Record<string, string> = {},
  transformer: SmartExpTransformer = smartExpTransformer,
): T[] => {
  return new QueryResolver(dlm, transformer).resolve(items, queryString);
}

type QueryResolveFunc<T> = (items: T[], query: string) => T[];

class QueryResolver<T extends object = any> {
  REVERSED_MAP: Record<string, string>;

  constructor(
    map: Record<string, string>,
    private transformer: SmartExpTransformer,
  ) {
    this.REVERSED_MAP = Object.entries(map).reduce((p, [k, v]) => ({
      ...p, [v]: k
    }), {} as Record<string, string>);
  }

  resolve(items: T[], queryString: string): T[] {
    return this.resolveQueries(items, queryString.split(' ').filter(q => q.length));
  }

  resolveQueries(items: T[], queries: string[]): T[] {
    return queries.reduce((_items, query: string) => {
      if (query.includes(':')) return this.inQueryByKey(_items, query);
      if (query.includes('=')) return this.inQueryByKey(_items, query);
      if (query.includes('>')) return this.gtQueryByKey(_items, query);
      if (query.includes('<')) return this.ltQueryByKey(_items, query);
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
    return items.filter(item => _not(this.in(key, flatten(toObject(item as any))?.[key], value), not));
  }

  private gtQueryByKey: QueryResolveFunc<T> = (items, query) => {
    const [_key, value] = query.split('>');
    const key = this.REVERSED_MAP?.[_key] ?? _key;
    return items.filter(item => {
      // TODO(nontangent): flattenしたときにdayjsが壊れる
      const v = flatten(toObject(item as any))?.[key] ?? toObject(item as any)?.[key];
      return this.gt(key, v, value)
    });
  }

  private ltQueryByKey: QueryResolveFunc<T> = (items, query) => {
    const [_key, value] = query.split('<');
    const key = this.REVERSED_MAP?.[_key] ?? _key;
    return items.filter(item => {
      // TODO(nontangent): flattenしたときにdayjsが壊れる
      const v = flatten(toObject(item as any))?.[key] ?? toObject(item as any)?.[key];
      return this.lt(key, v, value)
    });
  }

  private inQuery: QueryResolveFunc<T> = (items, q) => {
    return items.filter(item => Object.entries(flatten(toObject(item as T))).some(([k, v]) => this.in(k, v, q)));
  }

  private in(k: string, v: any, q: string) {
    return _in(this.transformer(v, k), q);
  }

  private gt(k: string, v: any, q: string) {
    // const value = dayjs.isDayjs(v) ? v : this.transformer(v, k);
    return _gt(v, q);
  }

  private lt(k: string, v: any, q: string) {
    // const value = dayjs.isDayjs(v) ? v : this.transformer(v, k);
    return _lt(v, q);
  }
}

const _not = (bool: boolean, not: boolean): boolean => {
  return not ? !bool : bool;
}

const _in = (value: any, query: string): boolean => {
  return typeof value === 'string' ? value?.includes(query) : false;
}

const _gt = (value: any, query: string): boolean => {
  return typeof value === 'string' 
    ? parseFloat(value) > parseFloat(query) 
    : typeof value === 'number'
    ? value > parseFloat(query)
    : dayjs.isDayjs(value)
    ? dayjs(query).isBefore(value)
    : false;
}

const _lt = (value: any, query: string): boolean => {
  return typeof value === 'string' 
    ? parseFloat(value) < parseFloat(query) 
    : typeof value === 'number'
    ? value < parseFloat(query)
    : dayjs.isDayjs(value)
    ? dayjs(query).isAfter(value)
    : false;
}
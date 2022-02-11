const getAllProps = (obj: object, keys: string[] = Object.keys(obj)): string[] => {
  const proto = Object.getPrototypeOf(obj);
  keys = Object.getOwnPropertyNames(proto)
    .filter(v => v !== '__proto__')
    .filter(v => Object.getOwnPropertyDescriptor(proto, v)!.get instanceof Function)
    .concat(keys);

  return proto.constructor.name === 'Object' ? keys : getAllProps(proto, keys);
}

export const toObject = (obj: object): object => getAllProps(obj).reduce((p, k) => ({...p, [k]: obj[k]}), {});

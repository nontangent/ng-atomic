import 'core-js/features/string/replace-all';

export const visibleSC = (str: string) => {
  return str
    // .replaceAll(' ', '<SPACE>')
    // .replaceAll('\s', '\\s')
    // .replaceAll('\t', '\\t')
    // .replaceAll('\n', '\\n')
    // .replaceAll('\r', '\\r');
};

export * from './parser';

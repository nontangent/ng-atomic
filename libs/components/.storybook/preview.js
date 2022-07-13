const PRIORITY = ['ATOMS', 'MOLECULES', 'ORGANISMS', 'TEMPLATES', 'PAGES', 'FRAMES'];

const parseKind = (kind) => kind.split('/');
const getPriority = (type) => PRIORITY.indexOf(type);
const compareType = (a, b) => getPriority(a.toUpperCase()) - getPriority(b.toUpperCase());
const compareName = (a, b) => a.localeCompare(b, undefined, { numeric: true });
const storySort = (a, b) => {
  const [typeA, nameA] = parseKind(a[1].kind);
  const [typeB, nameB] = parseKind(b[1].kind);
  return compareType(typeA, typeB) || compareName(nameA, nameB);
}

export const parameters = {
  options: {storySort},
};

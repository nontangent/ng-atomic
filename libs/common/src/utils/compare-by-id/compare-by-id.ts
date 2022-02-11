export type HasId = { id: string };
export const compareById = (a: HasId, b: HasId) => parseInt(a.id, 10) - parseInt(b.id, 10);

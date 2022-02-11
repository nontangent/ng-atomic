export const comma = (n: number | null): string => n === null ? '0' : n.toLocaleString();
export const commaStr = (n: number, unit: string = '円') => n < 0 ? `-${comma(abs(n))}${unit}` : `${comma(n)}${unit}`;
export const abs = (n: number) => Math.abs(n);
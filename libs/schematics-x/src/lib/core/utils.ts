import { parse } from "path";

export const hasExt = (path: string): boolean => !!parse(path).ext.length;
export const getDepth = (path: string): number => path.split('/').length;

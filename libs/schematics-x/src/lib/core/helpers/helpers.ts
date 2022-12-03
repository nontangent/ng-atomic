import { calculateDistance } from "./distance";

export function getEstimateSimilarFilePaths(path: string, files: string[]): string[] {
  const results = files.map(file => [calculateDistance(path, file), file] as [number, string]);
  const min = Math.min(...results.map(([distance]) => distance));
  return results.filter(([distance]) => distance === min).map(([_, file]) => file);
}

import { logger } from "../../../cli/logger";

export function parseJsonFuzzy<T = any>(
  json: string,
  suffixes = ['', ']', '"]'],
): T {
  if(!json.startsWith('[')) throw new Error('JSON is not started with `[`');
  try {
    return parseJsonWithSuffix(json, suffixes);
  } catch (e) {
    return parseJsonFuzzy(json.slice(0, -1));
  }
}

function parseJsonWithSuffix<T = any>(
  json: string,
  suffixes = ['', ']', '"]'],
): T {
  for (const suffix of suffixes) {
    try {
      return JSON.parse(json + suffix);
    } catch (e) {}
  }
  throw new Error('JSON cannot be parsed with suffixes');
}
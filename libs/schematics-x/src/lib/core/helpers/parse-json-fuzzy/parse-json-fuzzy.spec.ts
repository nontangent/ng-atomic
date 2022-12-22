import { parseJsonFuzzy } from "./parse-json-fuzzy";

describe('parseJsonFuzzy', () => {
  it('should be succeeded', () => {
    const input = '["1","2","3"]';
    expect(parseJsonFuzzy(input)).toEqual(["1", "2", "3"]);
  });

  it('should be succeeded', () => {
    const input = '["1","2","3';
    expect(parseJsonFuzzy(input)).toEqual(["1", "2", "3"]);
  });

  it('should be succeeded', () => {
    const input = '["1","2","';
    expect(parseJsonFuzzy(input)).toEqual(["1", "2", ""]);
  });

  it('should be succeeded', () => {
    const input = '["1","2",';
    expect(parseJsonFuzzy(input)).toEqual(["1", "2"]);
  });

  it('should be succeded', () => {
    const input = `[
      "auto pages/suggestions",
      "auto pages/suggestions/suggestions.module.ts",
      "auto pages/su`;
    expect(parseJsonFuzzy(input)).toEqual([
      "auto pages/suggestions",
      "auto pages/suggestions/suggestions.module.ts",
      "auto pages/su",
    ]);
  })
});



export function parseFilePath(filePath: string, characters = ['.', '/']): string[] {
  const result = [];
  let word = '';
  for (let i = 0; i < filePath.length; i++) {
    const char = filePath[i];
    if (characters.includes(char)) {
      if (word.length) result.push(word);
      result.push(char);
      word = '';
    } else {
      word += char;
    }
  }
  result.push(word);
  return result;
}

export const convertByWords = (str: string, words: string[]): string => {
  return parseFilePath(str).map(c => ~words.indexOf(c) ? words.indexOf(c) : c).join('');
}

export function getEstimateSimilarFilePaths(path: string, files: string[]): string[] {
  const wordSet = new Set([path, ...files].map(path => parseFilePath(path)).flat());
  wordSet.delete('.');
  wordSet.delete('/');
  const words = Array.from(wordSet);
  const results = files.map(file => {
    const distance = levenshteinDistance(convertByWords(path, words), convertByWords(file, words)) + depthDistance(path, file);
    return [distance, file] as [number, string];
  });
  const min = Math.min(...results.map(([distance]) => distance));
  return results.filter(([distance]) => distance === min).map(([_, file]) => file);
}

function depthDistance(str1: string, str2: string): number {
  const depth1 = str1.split('/').length;
  const depth2 = str2.split('/').length;
  return Math.abs(depth1 - depth2);
}


function levenshteinDistance(str1: string, str2: string): number {
  const cost = (a: string, b: string): number => {
    return a === b ? 0 : 1;
  }

  const d = [];
  for (let i = 0; i <= str1.length; i++) {
    d[i] = [];
    d[i][0] = i;
  }
  for (let j = 0; j <= str2.length; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost(str1[i - 1], str2[j - 1])
      );
    }
  }

  return d[str1.length][str2.length];
}
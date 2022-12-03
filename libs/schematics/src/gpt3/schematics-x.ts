import { FileEntry } from "@angular-devkit/schematics";
import { join, parse, resolve } from "path";
import { getEstimateSimilarFilePaths } from "./helpers";
import { JsonPrompter, OpenAiPrompter } from "./prompter";

const hasExt = (path: string): boolean => !!parse(path).ext.length;
const getDepth = (path: string): number => path.split('/').length;

export class SchematicsX {
  
  async generate(files: FileEntry[], path: string): Promise<FileEntry[]> {
    const generateFilePaths = await this.getGenerateFilePaths(files.map(file => file.path), path);
    console.log('Estimated! => ', generateFilePaths, '\n');

    return Promise.all(generateFilePaths.map(filePath => {
      return this.generateFileEntry(filePath, files);
    }));

    // const results = [];
    // for (const filePath of generateFilePaths) {
    //   const fileEntry = await this.generateFileEntry(filePath, files);
    //   results.push(fileEntry);
    // }
    // return results;
  }

  async generateFileEntry(path: string, files: FileEntry[] = []): Promise<FileEntry> {
    const similarFilePaths = getEstimateSimilarFilePaths(path, files.map(file => file.path));
    const fileEntries = files.filter(file => similarFilePaths.includes(file.path));
    console.log(`Estimating content of '${path}' by`, similarFilePaths, '...\n');
    return this._generateFileEntry(path, fileEntries);
  }

  async _generateFileEntry(path: string, fileEntries: FileEntry[]): Promise<FileEntry> {
    const clampedFileEntries = this.clampFileEntries(fileEntries, 2049);

    const prompter = new OpenAiPrompter(makeFilePrompt(clampedFileEntries, path));
    await prompter.autoWriteUntilEnd();
    return prompter.getFileEntry(path);
  }

  private clampFileEntries(fileEntries: FileEntry[], maxLength: number): FileEntry[] {
    const fileEntriesByLength = fileEntries.sort((a, b) => a.content.length - b.content.length);
    const results: FileEntry[] = [];
    fileEntriesByLength.reduce((length, fileEntry) => {
      const newLength = length + fileEntry.content.toString().length;
      if (newLength < maxLength) results.push(fileEntry);
      return newLength;
    }, 0);
    return results;
  }

  async getGenerateFilePaths(filePaths: string[], generatePath: string): Promise<string[]> {
    if (hasExt(generatePath)) {
      return [generatePath];
    } else {
      console.log('Estimating the paths of files to be generated...\n');
      return this.predicateGenerateFilePaths(filePaths, generatePath);
    };
  }

  async predicateGenerateFilePaths(filePaths: string[], generatePath: string): Promise<string[]> {
    const baseDir = getBasePath(filePaths);
    const _filePaths = filePaths.map(path => path.replace(baseDir, ''));
    const _generatePath = generatePath.replace(baseDir, '');
    const paths = await this._predicateGenerateFilePaths(_filePaths, _generatePath);
    return paths.map(path => join(baseDir, path));
  }

  private async _predicateGenerateFilePaths(filePaths: string[], generatePath: string): Promise<string[]> {
    const parentDir = resolve(generatePath, '..');
    const prompt = makeDirectoryPrompt(filePaths.filter(path => path.startsWith(parentDir)), generatePath);
    const prompter = new JsonPrompter(prompt);
    await prompter.autoWrite();
    const paths = prompter.getJsonFuzzy();
    return [...new Set(paths)]
      .filter(path => path.startsWith(generatePath) && hasExt(path))
      .filter(path => getDepth(path) === getDepth(generatePath) + 1);
  }
}

export function getBasePath(paths: string[]): string {
  const basePath = paths.reduce((acc, path) => {
    const pathParts = path.split('/');
    const accParts = acc.split('/');
    const parts = pathParts.filter((part, i) => part === accParts[i]);
    return parts.join('/');
  }, paths[0]);
  return basePath;
}

function makeDirectoryPrompt(files: string[], name: string): string {
  return `\`tree.json\` has 30 lines.\n\n\`\`\`tree.json\n[\n${files.map(file => `\t\"${file}\",`).join('\n')}\n\t\"${name}`;
}
 
function makeFilePrompt(files: FileEntry[], path: string): string {
  return `${makeFileCodeBlocks(files)}\n\n\`\`\`${path}\n`;
}

function makeFileCodeBlocks(files: FileEntry[]): string {
  return files.map(file => makeFileCodeBlock(file.path, file.content.toString())).join('\n\n');
}

function makeFileCodeBlock(name: string, content: string): string {
  return `\`\`\`${name}\n${content}\n\`\`\``;
}
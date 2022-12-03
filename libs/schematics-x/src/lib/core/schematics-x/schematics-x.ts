import { FileEntry } from "@angular-devkit/schematics";
import { FileTreeEstimator } from "../estimators";
import { FileContentEstimator } from "../estimators";
import { getEstimateSimilarFilePaths } from "../helpers";
import { Instructor } from "../instructor";
import { hasExt } from "../utils";

export class SchematicsX {

  protected fileTreeEstimator = new FileTreeEstimator();
  protected fileContentEstimator = new FileContentEstimator();

  async instruct(instructions: string, inputs: FileEntry[], outputSize?: number ): Promise<FileEntry[]> {
    const instructor = new Instructor();
    return instructor.instruct(inputs, instructions, outputSize);
  }
  
  async generate(path: string, files: FileEntry[]): Promise<FileEntry[]> {
    const generateFilePaths = await this.buildFilePaths(files.map(file => file.path), path);
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

  protected async generateFileEntry(path: string, files: FileEntry[] = []): Promise<FileEntry> {
    const similarFilePaths = getEstimateSimilarFilePaths(path, files.map(file => file.path));
    const fileEntries = files.filter(file => similarFilePaths.includes(file.path));
    const clampedFileEntries = clampFileEntries(fileEntries, 2049);

    console.log(`Estimating content of '${path}' by`, similarFilePaths, '...\n');
    return this.fileContentEstimator.estimate(path, clampedFileEntries);
  }

  protected async buildFilePaths(filePaths: string[], generatePath: string): Promise<string[]> {
    if (hasExt(generatePath)) {
      return [generatePath];
    } else {
      console.log('Estimating the paths of files to be generated...\n');
      return this.fileTreeEstimator.estimate(filePaths, generatePath);
    };
  }
}

function clampFileEntries(fileEntries: FileEntry[], maxLength: number): FileEntry[] {
  const fileEntriesByLength = fileEntries.sort((a, b) => a.content.length - b.content.length);
  const results: FileEntry[] = [];
  fileEntriesByLength.reduce((length, fileEntry) => {
    const newLength = length + fileEntry.content.toString().length;
    if (newLength < maxLength) results.push(fileEntry);
    return newLength;
  }, 0);
  return results;
}

 
import { FileEntry } from "@angular-devkit/schematics";
import { FileTreeEstimator } from "../estimators";
import { FileContentEstimator } from "../estimators";
import { getEstimateSimilarFilePaths } from "../helpers";
import { Instructor } from "../instructor";
import { hasExt } from "../utils";

async function promiseAllOrForLoop<T>(promises: (() => Promise<T>)[], parallel = false): Promise<T[]> {
  if (parallel) return Promise.all(promises.map(promise => promise()));
  const results: T[] = [];
  for (const promise of promises) results.push(await promise());
  return results;
}

interface SchematicsXConfig {
  parallel?: boolean;
}

export class SchematicsX {

  constructor(private config: SchematicsXConfig) {}

  protected fileTreeEstimator = new FileTreeEstimator();
  protected fileContentEstimator = new FileContentEstimator();

  async instruct(instructions: string, inputs: FileEntry[], outputSize?: number ): Promise<FileEntry[]> {
    const instructor = new Instructor();
    return instructor.instruct(inputs, instructions, outputSize);
  }
  
  async generateAuto(targetPath: string, files: FileEntry[]): Promise<FileEntry[]> {
    if (hasExt(targetPath)) {
      return Promise.all([this.generateFile(targetPath, files)]);
    } else {
      return this.generateDirectory(targetPath, files);
    };
  }

  async generateDirectory(targetPath: string, files: FileEntry[]): Promise<FileEntry[]> {
    console.log('Estimating the paths of files to be generated...\n');
    const generateFilePaths =  await this.fileTreeEstimator.estimate(files.map(file => file.path), targetPath);
    console.log('Estimated! => ', generateFilePaths, '\n');

    return promiseAllOrForLoop(generateFilePaths.map(filePath => {
      return () => this.generateFile(filePath, files);
    }), this.config.parallel);
  }

  async generateFile(path: string, files: FileEntry[] = []): Promise<FileEntry> {
    const similarFileEntries = this.getSimilarFilePaths(path, files);
    const clampedFileEntries = clampFileEntries(similarFileEntries, 2049);
    console.log(`Estimating content of`, path, `by`, clampedFileEntries.map((f) => f.path), '...\n');
    return this.fileContentEstimator.estimate(path, clampedFileEntries);
  }

  protected getSimilarFilePaths(path: string, files: FileEntry[]): FileEntry[] {
    const similarFilePaths = getEstimateSimilarFilePaths(path, files.map(file => file.path));
    return files.filter(file => similarFilePaths.includes(file.path));
  }

  protected buildFileContentEstimateInstructions(path: string): string {
    return this.fileContentEstimator.buildInstructions(path);
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

 
import { FileEntry } from "@angular-devkit/schematics";
import { Instructor } from "../../instructor";

export class OutputFileEntryEstimator {
  async estimate(
    inputFileEntries: FileEntry[], 
    instructions: string,
    outputFilePath: string
  ): Promise<FileEntry> {
    const instructor = new Instructor();
    const output = await instructor.instruct(inputFileEntries, instructions, [outputFilePath]);
    return output.slice(inputFileEntries.length).find(fileEntry => fileEntry.path === outputFilePath);
  }

  buildInstructions(path: string): string {
    return `Write a content of \`${path}\` like inputs:`;
  }
}
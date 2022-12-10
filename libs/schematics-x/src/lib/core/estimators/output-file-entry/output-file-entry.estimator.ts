import { FileEntry } from "@angular-devkit/schematics";
import { DUMMY_FILE_ENTRY } from "../../dummy";
import { Instructor } from "../../instructor";
import { InputFileEntriesReducer } from "../../reducers";

const ReduceInputFileEntries = (size: number) => {
  return function (_0, _1, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (
      _inputFileEntries: FileEntry[], 
      instructions: string, 
      outputPaths: string[],
    ) {
      const reducer = new InputFileEntriesReducer();
      const inputFileEntries = reducer.reduce(_inputFileEntries, instructions, size);
      return originalMethod.apply(this, [inputFileEntries, instructions, outputPaths]);
    };

    return descriptor;
  }
}


export class OutputFileEntryEstimator {
  @ReduceInputFileEntries(1600)
  async estimate(
    inputFileEntries: FileEntry[], 
    instructions: string,
    outputFilePath: string
  ): Promise<FileEntry> {
    if (inputFileEntries.length === 0) {
      inputFileEntries = [DUMMY_FILE_ENTRY];
    }

    const instructor = new Instructor();
    const output = await instructor.instruct(inputFileEntries, instructions, [outputFilePath]);
    return output.find(fileEntry => fileEntry.path === outputFilePath);
  }

  buildInstructions(path: string): string {
    return `Write a content of \`${path}\` like inputs:`;
  }
}

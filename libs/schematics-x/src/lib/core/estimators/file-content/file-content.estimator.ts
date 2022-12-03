import { FileEntry } from "@angular-devkit/schematics";
import { Instructor } from "../../instructor";

export class FileContentEstimator {
  async estimate(path: string, fileEntries: FileEntry[]): Promise<FileEntry> {
    const instructor = new Instructor();
    const instructions = this.buildInstructions(path);
    const output = await instructor.instruct(fileEntries, instructions, 1);
    return output[0];
  }

  buildInstructions(path: string): string {
    return `Write a content of "${path}" with above examples:`;
  }
}

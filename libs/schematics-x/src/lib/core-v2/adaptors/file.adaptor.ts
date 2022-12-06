import { Tree } from "@angular-devkit/schematics";
import { ExecuteOptions as BaseExecuteOptions } from "../schematics-x";

export interface FileExecuteOptions {
  filePath: string;
  inputScope: string;
}

export class FileAdaptor {
  static options(options: FileExecuteOptions): BaseExecuteOptions {
    return {
      instructions: this.BUILD_INSTRUCTIONS(options.filePath),
      inputScope: options.inputScope,
      outputScope: options.filePath,
    };
  }

  static BUILD_INSTRUCTIONS(path: string) {
    return `Generate a file "${path}".`;
  }
}

// "$ sx directory /components/user --inputScope=components/ --outputScope=components/user/components.ts"
// "$ sx instruct 'Generate directory `/components/user` and similar files' --inputScope=components/ --input=components/test,components/example "

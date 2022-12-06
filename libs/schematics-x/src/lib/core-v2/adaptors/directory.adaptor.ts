import { ExecuteOptions as BaseExecuteOptions } from "../schematics-x";

export interface ExecuteOptions {
  dirPath: string;
  inputScope: string;
  outputScope: string;
}

export class DirectoryAdaptor {
  static options(options: ExecuteOptions): BaseExecuteOptions {
    return {
      instructions: this.BUILD_INSTRUCTIONS(options.dirPath),
      inputScope: options.inputScope,
      outputScope: options.outputScope,
    };
  }

  static BUILD_INSTRUCTIONS(dirPath: string) {
    return `Added "${dirPath}" directory`;
  }
}

// "$ sx directory /components/user --inputScope=components/ --outputScope=components/user/components.ts"
// "$ sx instruct 'Generate directory `/components/user` and similar files' --inputScope=components/ --input=components/test,components/example "

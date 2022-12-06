import { hasExt } from "../../core/utils";
import { ExecuteOptions as BaseExecuteOptions } from "../schematics-x";
import { DirectoryAdaptor } from "./directory.adaptor";
import { FileAdaptor } from "./file.adaptor";

export interface AutoAdaptorOptions {
  path: string;
  inputScope?: string;
  outputScope?: string;
}

export class AutoAdaptor {
  static options(options: AutoAdaptorOptions): BaseExecuteOptions {
    if (hasExt(options.path)) {
      return FileAdaptor.options({
        filePath: options.path,
        inputScope: options.inputScope,
      });
    } else {
      return DirectoryAdaptor.options({
        dirPath: options.path,
        inputScope: options.inputScope,
        outputScope: options.outputScope,
      })
    }
  }
}

// "$ sx directory /components/user --inputScope=components/ --outputScope=components/user/components.ts"
// "$ sx instruct 'Generate directory `/components/user` and similar files' --inputScope=components/ --input=components/test,components/example "

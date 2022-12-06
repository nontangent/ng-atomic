import { FileEntry, Tree } from "@angular-devkit/schematics";
import { OutputFileEntryEstimator, OutputFilePathsEstimator, RelatedFilePathsEstimator } from "../estimators";
import { getFiles, promiseAllOrForLoop } from "../../core/utils";
import { join } from "path";

export interface ExecuteOptions {
  instructions: string;
  inputScope: string;
  outputScope: string;
  inputFilePaths?: string[];
  outputFilePaths?: string[];

  parallel?: boolean;
}

export class Glob {
  async glob(param: string, tree: Tree): Promise<string[]> {
    // TODO(nontangent): Implements
    return getFiles(tree.getDir(param)).map(p => join(param, p));
  }
}

export class ScopePathFilter {
  filter(paths: string[], scope: string): string[] {
    // TODO(nontangent): Implements
    return paths.filter(path => path.startsWith(scope));
  }
}

export class SchematicsX {
  constructor(
    private glob = new Glob(),
    private scopePathFilterPipe = new ScopePathFilter(),
    private outputFilePathsEstimator = new OutputFilePathsEstimator(),
    private outputFileEntryEstimator = new OutputFileEntryEstimator(),
    private relatedFilePathsEstimator = new RelatedFilePathsEstimator(),
  ) { }

  async execute(tree: Tree, options: ExecuteOptions): Promise<FileEntry[]> {
    options.inputFilePaths ??= await this.glob.glob(options.inputScope, tree);

    const scopedInputFilePaths = this.scopePathFilterPipe.filter(
      options.inputFilePaths, options.inputScope
    );

    options.outputFilePaths ??= await this.outputFilePathsEstimator.estimate(
      scopedInputFilePaths, options.instructions,
    );

    const scopedOutputFilePaths = this.scopePathFilterPipe.filter(
      options.outputFilePaths, options.outputScope
    );

    const promises = scopedOutputFilePaths.map((scopedOutputFilePath) => {
      return () => this.estimateFileEntry(tree, {
        scopedInputFilePaths,
        instructions: options.instructions,
        scopedOutputFilePath
      });
    });

    return promiseAllOrForLoop(promises, options.parallel);

  }

  private async estimateFileEntry(tree, {scopedInputFilePaths, instructions, scopedOutputFilePath}) {
    // TODO: implements
    const relatedInputFilePaths = await this.relatedFilePathsEstimator.estimate(
      scopedInputFilePaths, scopedOutputFilePath
    );

    // TODO: implements
    const relatedInputFileEntries = relatedInputFilePaths.map((filePath) => tree.get(filePath));

    // TODO: implements
    return this.outputFileEntryEstimator.estimate(
      relatedInputFileEntries, instructions, scopedOutputFilePath
    );
  }
}
import { FileEntry, Tree } from "@angular-devkit/schematics";
import { OutputFileEntryEstimator, OutputFilePathsEstimator, RelatedFilePathsEstimator } from "../estimators";
import { getFiles, promiseAllOrForLoop } from "../helpers/utils";
import { join } from "path";
import { Injectable } from '@nx-ddd/core';

export interface ExecuteOptions {
  instructions: string;
  inputScope: string;
  outputScope: string;
  inputFilePaths?: string[];
  outputFilePaths?: string[];

  parallel?: boolean;
}

@Injectable()
export class Glob {
  async glob(param: string, tree: Tree): Promise<string[]> {
    // TODO(nontangent): Implements
    return getFiles(tree.getDir(param)).map(p => join(param, p));
  }
}

@Injectable()
export class ScopeResolver {
  filter(paths: string[], scope: string): string[] {
    // TODO(nontangent): Implements
    return paths.filter(path => path.startsWith(scope));
  }
}

@Injectable()
export class SchematicsX {
  constructor(
    private readonly glob: Glob,
    private readonly scopePathFilterPipe: ScopeResolver,
    private readonly outputFilePathsEstimator: OutputFilePathsEstimator,
    private readonly outputFileEntryEstimator: OutputFileEntryEstimator,
    private readonly relatedFilePathsEstimator: RelatedFilePathsEstimator,
  ) { }

  async execute(tree: Tree, options: ExecuteOptions): Promise<FileEntry[]> {
    process.env['SX_VERBOSE_LOGGING'] && console.debug('options:', options);

    options.inputFilePaths ??= await this.glob.glob(options.inputScope, tree);
    process.env['SX_VERBOSE_LOGGING'] && console.debug('inputFilePaths:', options.inputFilePaths);

    const scopedInputFilePaths = this.scopePathFilterPipe.filter(
      options.inputFilePaths, options.inputScope
    );

    process.env['SX_VERBOSE_LOGGING'] && console.debug('scopedInputFilePaths:', scopedInputFilePaths);

    options.outputFilePaths ??= await this.outputFilePathsEstimator.estimate(
      scopedInputFilePaths, options.instructions,
    );

    const scopedOutputFilePaths = this.scopePathFilterPipe.filter(
      options.outputFilePaths, options.outputScope
    );
    process.env['SX_VERBOSE_LOGGING'] && console.debug('scopedOutputFilePaths:', scopedOutputFilePaths);

    const promises = scopedOutputFilePaths.map((scopedOutputFilePath) => {
      return () => this.estimateFileEntry(tree, {
        scopedInputFilePaths,
        instructions: options.instructions,
        scopedOutputFilePath
      });
    });

    return promiseAllOrForLoop(promises, options.parallel);
  }

  private async estimateFileEntry(tree: Tree, {scopedInputFilePaths, instructions, scopedOutputFilePath}) {
    const relatedInputFilePaths = await this.relatedFilePathsEstimator.estimate(
      scopedInputFilePaths, scopedOutputFilePath
    );
    process.env['SX_VERBOSE_LOGGING'] && console.debug('scopedOutputFilePath:', scopedOutputFilePath);
    process.env['SX_VERBOSE_LOGGING'] && console.debug('relatedInputFilePaths:', relatedInputFilePaths);

    const relatedInputFileEntries = relatedInputFilePaths
      .map((path) => tree.get(path))
      .filter((entry) => !!entry);

    return this.outputFileEntryEstimator.estimate(
      relatedInputFileEntries, instructions, scopedOutputFilePath
    );
  }
}

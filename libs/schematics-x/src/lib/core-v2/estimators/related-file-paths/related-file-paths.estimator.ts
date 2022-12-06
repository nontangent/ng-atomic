import { getEstimateSimilarFilePaths } from '../../../core/helpers';

export class RelatedFilePathsEstimator {
  async estimate(inputFilePaths: string[], outputFilePath: string): Promise<string[]> {
    return getEstimateSimilarFilePaths(outputFilePath, inputFilePaths);
  }
}

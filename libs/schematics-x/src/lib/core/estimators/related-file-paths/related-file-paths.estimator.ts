import { Injectable } from "@nx-ddd/core";
import { calculateDistance } from "../../helpers/distance/";

@Injectable()
export class RelatedFilePathsEstimator {
  async estimate(inputFilePaths: string[], outputFilePath: string): Promise<string[]> {
    const results = inputFilePaths.map(file => [calculateDistance(outputFilePath, file), file] as [number, string]);
    const min = Math.min(...results.map(([distance]) => distance));
    return results.filter(([distance]) => distance === min).map(([_, file]) => file);
  }
}

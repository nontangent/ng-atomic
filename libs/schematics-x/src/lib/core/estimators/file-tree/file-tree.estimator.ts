import { join } from "path";
import { Instructor } from "../../instructor";
import { getDepth, hasExt } from "../../utils";

export class FileTreeEstimator {

  async estimate(filePaths: string[], outputPath: string): Promise<string[]> {
    const paths = await this.addDirectory(filePaths, outputPath);
    return [...new Set(paths)].filter(path => {
      return path.startsWith(outputPath) && hasExt(path) && getDepth(path) === getDepth(outputPath) + 1;
    });
  }

  @WithStandardizePath
  private async addDirectory(filePaths: string[], addedPath: string): Promise<string[]> {
    const instructor = new Instructor();
    const input = instructor.buildInputJson(filePaths);
    const instruct = `Add "${addedPath}" directory with estimated files and keep current array.`;
    const [output] = await instructor.instruct([input], instruct)
    return JSON.parse(output.content.toString());
  }
}

function standardize(paths: string[], baseDir: string): string[] {
  return paths.map(path => path.replace(baseDir, ''));
}
function WithStandardizePath(_1, _2, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (filePaths: string[], outputPath: string) {
    const base = getBasePath([outputPath, ...filePaths]);
    const [_outputPath, ..._filePaths] = standardize([outputPath, ...filePaths], base);
    return (await originalMethod.apply(this, [_filePaths, _outputPath])).map((path: string) => join(base, path));
  };
}

function getBasePath(paths: string[]): string {
  const basePath = paths.reduce((acc, path) => {
    const pathParts = path.split('/');
    const accParts = acc.split('/');
    const parts = pathParts.filter((part, i) => part === accParts[i]);
    return parts.join('/');
  }, paths[0]);
  return basePath;
}

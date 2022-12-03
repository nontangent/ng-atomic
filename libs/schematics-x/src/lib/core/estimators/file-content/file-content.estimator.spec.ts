import { FileEntry } from "@angular-devkit/schematics";
import { readFileSync } from "fs";
import { join } from "path";
import { FileContentEstimator } from "./file-content.estimator";

function loadFile(path: string): FileEntry {
  const file = readFileSync(join(__dirname, path));
  return { path: path as any, content: file };
}

describe('FileContentEstimator', () => {
  let estimator: FileContentEstimator;

  beforeEach(() => {
    estimator = new FileContentEstimator();
  });

  it('should estimate', async () => {
    const inputs = [
      loadFile('./_testing/entries/entries.page.html'),
      loadFile('./_testing/community/community.page.html'),
    ];
    const expected = loadFile('./_testing/entries/entries.page.html');
    const output = await estimator.estimate('./_testing/users/users.page.html', inputs);
    console.debug('output:', output.content.toString());
    expect(output).toBeTruthy();
  });
});

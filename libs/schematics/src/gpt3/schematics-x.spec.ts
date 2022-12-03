import { FileEntry } from '@angular-devkit/schematics';
import { SchematicsX } from './schematics-x';

const FILE_ENTRIES = [
  {
    path: '/projects/app/src/app/_shared/components/test/test.module.ts',
    content: Buffer.from(`test`),
  },
  {
    path: '/projects/app/src/app/_shared/components/example/example.module.ts',
    content: Buffer.from(`example`),
  },
] as FileEntry[];

describe('SchematicsX', () => {
  let schematicsX: SchematicsX;

  beforeEach(() => {
    schematicsX = new SchematicsX();
  });

  describe('generateFileEntry', () => {
    it('should create', async () => {
      const PATH = '/projects/app/src/app/_shared/components/expected/expected.module.ts';
      const entry = await schematicsX.generateFileEntry(PATH, FILE_ENTRIES);
      expect(entry.content.toString()).toEqual(`expected`);
    });
  });
});

import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { TestBed } from '@nx-ddd/core';
import { join } from 'path';
import { createWorkspace } from '../../_testing';
import { SchematicsX, Glob } from './schematics-x';
import { SchematicsXModule } from './schematics-x.module';
import { mockOutputFileEntryEstimator } from '../estimators/output-file-entry/testing';
import { mockOutputFilePathsEstimator } from '../estimators/output-file-paths/testing';
import { mockRelatedFilePathsEstimator } from '../estimators/related-file-paths/testing';
import { OutputFileEntryEstimator, OutputFilePathsEstimator, RelatedFilePathsEstimator } from '../estimators';

jest.setTimeout(300 * 1000);

const COLLECTION_PATH = join(__dirname, '../../../../collection.json');


describe('Glob V2', () => {
  let glob: Glob;
  let tree: UnitTestTree;
  const runner = new SchematicTestRunner('schematics-x', COLLECTION_PATH);

  beforeEach(async () => {
    glob = new Glob();
    tree = await createWorkspace(runner, tree);
  });

  it('should create', () => {
    expect(glob).toBeTruthy();
  });

  it('should find files', async () => {
    const files = await glob.glob('/projects/app', tree);
    console.debug('files:', files);
    expect(files.length).toBeGreaterThan(0);
  });
});

// describe('ScopePathFilter', () => {
//   let filter: ScopePathFilter;

//   beforeEach(() => {
//     filter = new ScopePathFilter();
//   });

//   it('should', () => {
//     expect(filter.filter([
//       '/projects/app/src/app/_shared/components/example/example.module.ts',
//       '/node_modules/@angular-devkit/schematics/src/tree/interface.d.ts',
//     ], '/projects/app/src/app/_shared/components/example').length).toEqual(1);
//   });
// });


describe('SchematicsX V2', () => {
  let schematicsX: SchematicsX;
  let tree: UnitTestTree;
  const runner = new SchematicTestRunner('schematics-x', COLLECTION_PATH);

  beforeAll(async () => {
    tree = await createWorkspace(runner, tree);
    tree = await runner.runExternalSchematicAsync('@ng-atomic/schematics/../collection.json', 'atomic-component', {
      project: 'app', path: '_shared/components', name: 'example'
    }, tree).toPromise();

    tree = await runner.runExternalSchematicAsync('@ng-atomic/schematics/../collection.json', 'atomic-component', {
      project: 'app', path: '_shared/components', name: 'test'
    }, tree).toPromise();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SchematicsXModule],
      providers: [
        {
          provide: OutputFileEntryEstimator,
          useValue: mockOutputFileEntryEstimator,
        },
        {
          provide: RelatedFilePathsEstimator,
          useValue: mockRelatedFilePathsEstimator,
        },
        {
          provide: OutputFilePathsEstimator,
          useValue: mockOutputFilePathsEstimator,
        },
      ],
    });

    schematicsX = TestBed.inject(SchematicsX);
  });

  it('should create', () => {
    expect(schematicsX).toBeTruthy();
  });

  it('should find files', async () => {
    mockOutputFilePathsEstimator.estimate.mockResolvedValue([
      '/projects/app/src/app/_shared/components/user/user.module.ts',
    ]);

    mockRelatedFilePathsEstimator.estimate.mockResolvedValue([
      '/projects/app/src/app/_shared/components/example/example.module.ts',
      '/projects/app/src/app/_shared/components/test/test.module.ts',
    ]);

    mockOutputFileEntryEstimator.estimate.mockResolvedValue({
      path: '/projects/app/src/app/_shared/components/user/user.module.ts' as any,
      content: Buffer.from('This is UserModule'),
    });

    const files = await schematicsX.execute(tree, {
      instructions: `Create user component to \`/projects/app/src/app/_shared/components/user\``,
      inputScope: `/projects/app/src/app/_shared/components/`,
      outputScope: `/projects/app/src/app/_shared/components/user`
    });

    expect(mockOutputFileEntryEstimator.estimate).toBeCalled();
    expect(mockOutputFileEntryEstimator.estimate).toBeCalled();
    expect(mockRelatedFilePathsEstimator.estimate).toBeCalled();
    expect(files[0].path).toEqual('/projects/app/src/app/_shared/components/user/user.module.ts');
    expect(files[0].content.toString()).toEqual('This is UserModule');
  });
});

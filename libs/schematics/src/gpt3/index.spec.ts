import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import path from 'path';
import { createWorkspace } from '../_testing';

jest.setTimeout(300 * 1000);

const COLLECTION_PATH = path.join(__dirname, '../../collection.json');

describe('Gpt Schematics', () => {
  const runner = new SchematicTestRunner('@ng-atomic/schematics', COLLECTION_PATH);
  let tree: UnitTestTree;

  xdescribe('Angular Workspace', () => {
    beforeEach(async () => {
      tree = await createWorkspace(runner, tree);
      tree = await runner.runSchematicAsync('atomic-component', {
        project: 'app', path: '_shared/components', name: 'example'
      }, tree).toPromise();

      tree = await runner.runSchematicAsync('atomic-component', {
        project: 'app', path: '_shared/components', name: 'test'
      }, tree).toPromise();

      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.module.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.component.html');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.component.scss');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.component.spec.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.component.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/example.stories.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/example/index.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.module.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.component.html');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.component.scss');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.component.spec.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.component.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/test.stories.ts');
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/test/index.ts');
    });

    xit('should create atomic component files', async () => {
      tree = await runner.runSchematicAsync('gpt3', {
        project: 'app', path: '_shared/components', name: 'expected'
      }, tree).toPromise();
      // expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.module.ts');
      // expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.component.html');
      // expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.component.scss');
      // expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.component.spec.ts');
      // expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.component.ts');
      // expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.stories.ts');
      // expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/index.ts');
    });

    xit('should create atomic component files', async () => {
      tree = await runner.runSchematicAsync('gpt3', {
        project: 'app', path: '_shared/components/', name: 'expected/expected.module.ts'
      }, tree).toPromise();
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.module.ts');
    });

    it('should create atomic component files', async () => {
      tree = await runner.runSchematicAsync('gpt3', {
        project: 'app', path: '', name: '_shared/components/expected/expected.module.ts'
      }, tree).toPromise();
      expect(tree.files).toContain('/projects/app/src/app/_shared/components/expected/expected.module.ts');
    });
  });
});


const TEST = `
\`\`\`tree.json
[]
\`\`\`
`;

// describe('completeToJson', () => {
//   xit('should convert to json', () => {
//     expect(completeToJson(TEST)).toBeTruthy();
//   });
// });

// describe('parseJsonCodeBlock', () => {
//   it('should parse json code block', () => {
//     expect(parseJsonCodeBlock(TEST)).toBeTruthy();
//   });
// });


const CODE_BLOCKS = `
\`\`\`/projects/app/src/app/_shared/components/test/test.component.ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'undefineds-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

\`\`\`

\`\`\`/projects/app/src/app/_shared/components/example/example.component.ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'undefineds-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

\`\`\`

\`\`\`/projects/app/src/app/_shared/components/expected/expected.component.ts
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'undefineds-expected',
  templateUrl: './expected.component.html',
  styleUrls: ['./expected.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpectedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

\`\`\`
`;

// describe('parseCodeBlocks', () => {
//   it('should parse code blocks', () => {
//     expect(parseCodeBlocks(CODE_BLOCKS)).toBeTruthy();
//   });
// });

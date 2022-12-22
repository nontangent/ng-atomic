import { Injectable } from '@nx-ddd/core';
import { DUMMY_FILE_ENTRY } from '../../dummy';
import { parseJsonFuzzy } from '../../helpers';
import { Instructor } from '../../instructor';
import { FilePathsReducer } from '../../reducers';

const ReduceInputsFilePaths = (size: number) => {
  return function (_0, _1, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (
      _inputFilePaths: string[], 
      instructions: string, 
      context: string = '',
    ) {
      const reducer = new FilePathsReducer();
      const inputFilePaths = reducer.reduce(_inputFilePaths, size);
      return originalMethod.apply(this, [inputFilePaths, instructions, context]);
    }
    
    return descriptor;
  }
};

@Injectable()
export class OutputFilePathsEstimator {

  constructor(
    protected instructor: Instructor
  ) { }

  @ReduceInputsFilePaths(50)
  async estimate(inputFilePaths: string[], instructions: string): Promise<string[]> {

    if (inputFilePaths.length === 0) {
      inputFilePaths = [DUMMY_FILE_ENTRY.path];
    }

    const inputs = [this.instructor.buildInputJson(inputFilePaths)];
    const expected = [this.instructor.buildOutputEntry('', 'output.json')];
    const prompt = BUILD_INSTRUCTIONS(instructions);
    const fileEntries = await this.instructor.instruct(inputs, prompt, expected, CONTEXT, {
      maxTokens: 2048,
    });
    const fileEntry = fileEntries.find(fileEntry => fileEntry.path === 'output.json');
    return parseJsonFuzzy(fileEntry.content.toString()).filter((path: string) => path !== DUMMY_FILE_ENTRY.path);
  }
}

export function BUILD_INSTRUCTIONS(INSTRUCTIONS: string) {
  return `Output the array of the path of file that is` +
  ` changed when the instructions "${INSTRUCTIONS}"` +
  ` is received for the file of the \`input.json\` array.`;
}

const CONTEXT = `
Input_0:
\`\`\`example-01.input.json
[
  "/projects/app/src/app/_shared/components/user/user.module.ts",
  "/projects/app/src/app/_shared/components/test/test.module.ts"
]
\`\`\`

Inputs: ["example.input.json"]
Instructions: ${BUILD_INSTRUCTIONS('Generate a directory `/projects/app/src/app/_shared/components/expected`')}.
Outputs: ["example.output.json"]

Output_0:
\`\`\`example-01.output.json
[
  "/projects/app/src/app/_shared/components/expected/expected.module.ts"
]
\`\`\`

Input_0:
\`\`\`example-02.input.json
[]
\`\`\`

Inputs: ["example-02.input.json"]
Instructions: ${BUILD_INSTRUCTIONS('Generate README.md')}.
Outputs: ["example.output.json"]

Output_0:
\`\`\`example-02.output.json
[
  "/README.md"
]
\`\`\`
`;

import { Instructor } from '../../instructor';

export class OutputFilePathsEstimator {
  async estimate(inputFilePaths: string[], instructions: string): Promise<string[]> {
    const instructor = new Instructor();
    const inputJson = instructor.buildInputJson(inputFilePaths);
    const prompt = BUILD_INSTRUCTIONS(instructions);
    const fileEntries = await instructor.instruct([inputJson], prompt, ['output.json'], CONTEXT);
    const fileEntry = fileEntries.find(fileEntry => fileEntry.path === 'output.json');
    return JSON.parse(fileEntry.content.toString());
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

Output:
\`\`\`example-01.output.json
[
  "/projects/app/src/app/_shared/components/expected/expected.module.ts"
]
\`\`\`
`;

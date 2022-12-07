import { FileEntry } from "@angular-devkit/schematics";
import { OpenAiPrompter } from "../prompter";


export class Instructor {
  async instruct(inputs: FileEntry[], instructions: string, outputPaths: string[], context: string = ''): Promise<FileEntry[]> {
    if (!inputs.length) throw new Error('At least one input file is required!')

    const prompter = new OpenAiPrompter('');
    prompter.write(context.length ? '# EXAMPLES\n' + context : '');
    prompter.write(`# PRACTICE\n`);

    for (let i = 0; i < inputs.length; i++) {
      prompter.write(`Input_${i}: \`\`\`${inputs[i].path}\n`);
      prompter.write(`${inputs[i].content.toString()}\n`);
      prompter.write(`\`\`\`\n\n`);
    }

    prompter.write(`Inputs: [${inputs.map(input => `"${input.path}"`).join(', ')}]\n`);
    prompter.write(`Instructions: ${instructions}\n`);
    prompter.write(`Outputs: [${outputPaths.map(path => `"${path}"`).join(', ')}]\n\n`);

    for (let i = 0; i < outputPaths.length; i++) {
      prompter.write(`Output_${i}: \`\`\`${outputPaths?.[i] ?? ''}`);
      await prompter.autoWriteUntilEnd();
    }

    process.env['DEBUG'] && console.debug(prompter.prompt);

    return prompter.getFileEntries().slice(-outputPaths.length);
  }

  buildInputJson(obj: object, path = 'input.json'): FileEntry {
    return {
      path: path as any,
      content: Buffer.from(JSON.stringify(obj, null, 2)),
    }
  }
}

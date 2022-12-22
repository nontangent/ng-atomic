import { FileEntry } from "@angular-devkit/schematics";
import { Injectable } from "@nx-ddd/core";
import { PromiseQueue } from "../promise-queue";
import { OpenAiPrompter, WriteOptions } from "../prompter";


@Injectable()
export class Instructor {
  constructor(
    protected promiseQueue: PromiseQueue,
  ) { }

  async instruct(
    inputs: FileEntry[],
    instructions: string,
    outputs: FileEntry[],
    context: string = '',
    options?: WriteOptions
  ): Promise<FileEntry[]> {
    if (!inputs.length) throw new Error('At least one input file is required!')

    const prompter = new OpenAiPrompter(this.promiseQueue);
    prompter.write(context.length ? '# EXAMPLES\n' + context : '');
    prompter.write(`# PRACTICE\n`);

    for (let i = 0; i < inputs.length; i++) {
      prompter.write(`Input_${i}: \`\`\`${inputs[i].path}\n`);
      prompter.write(`${inputs[i].content.toString()}\n`);
      prompter.write(`\`\`\`\n\n`);
    }

    prompter.write(`Inputs: [${inputs.map(input => `"${input.path}"`).join(', ')}]\n`);
    prompter.write(`Instructions: ${instructions}\n`);
    prompter.write(`Outputs: [${outputs.map(output => `"${output.path}"`).join(', ')}]\n\n`);

    for (let i = 0; i < outputs.length; i++) {
      prompter.write(`Output_${i}: \`\`\`${outputs[i].path}\n`);
      prompter.write(`${outputs[i].content.toString()}`);
      await prompter.autoWriteUntilEnd(options);
    }

    // process.env['SX_VERBOSE_LOGGING'] && console.debug(prompter.prompt);

    return prompter.getFileEntries().slice(-outputs.length);
  }

  buildInputJson(obj: object, path = 'input.json'): FileEntry {
    return {
      path: path as any,
      content: Buffer.from(JSON.stringify(obj, null, 2)),
    }
  }

  buildOutputEntry(content: string, path = 'output.json'): FileEntry {
    return { path: path as any, content: Buffer.from(content) };
  }
}

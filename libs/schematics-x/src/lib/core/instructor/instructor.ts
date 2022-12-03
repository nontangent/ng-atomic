import { FileEntry } from "@angular-devkit/schematics";
import { OpenAiPrompter } from "../prompter";

export class Instructor {
  async instruct(inputs: FileEntry[], instructions: string, outputSize = inputs.length): Promise<FileEntry[]> {
    const prompter = new OpenAiPrompter('');
    for (let i = 0; i < inputs.length; i++) {
      prompter.write(`Input_${i}: \`\`\`${inputs[i].path}\n`);
      prompter.write(`${inputs[i].content.toString()}\n`);
      prompter.write(`\`\`\`\n\n`);
    }

    prompter.write(`Instructions: ${instructions}\n\n`);

    for (let i = 0; i < outputSize; i++) {
      prompter.write(`Output_${i}: \`\`\``);
      await prompter.autoWriteUntilEnd();
    }

    return prompter.getFileEntries().slice(inputs.length);
  }

  buildInputJson(obj: object, path = 'input.json'): FileEntry {
    return {
      path: path as any,
      content: Buffer.from(JSON.stringify(obj, null, 2)),
    }
  }

  async rename(input: FileEntry, path: string): Promise<FileEntry> {
    return this.instruct([input], `Rename to "${path}" from "${input.path}" and fix import paths.`)[0];
  }
}

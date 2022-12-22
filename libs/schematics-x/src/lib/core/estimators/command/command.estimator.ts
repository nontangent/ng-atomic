import { Injectable } from "@nx-ddd/core";
import { parseJsonFuzzy } from "../../helpers";
import { Instructor } from "../../instructor";

@Injectable()
export class CommandEstimator {
  constructor(private instructor: Instructor) { }

  async estimate(history: string[], prompt: string): Promise<string[]> {
    const inputs = [this.instructor.buildInputJson(history)];
    const expected = [
      this.instructor.buildOutputEntry(`[\n\t"${prompt}`, 'output.json'),
    ];
    const outputs = await this.instructor.instruct(inputs, BUILD_INSTRUCTIONS(prompt), expected, undefined, {
      model: 'text-babbage-001',
    });
    const output = outputs.find((output) => output.path === 'output.json');
    return parseJsonFuzzy(output.content.toString());
  }
}

const BUILD_INSTRUCTIONS = (prompt) => {
  return `Estimate 5 commands starting with "${prompt}" and output them as a json array.`;
}

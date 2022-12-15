import { Injectable } from "@nx-ddd/core";
import { Instructor } from "../../instructor";

export interface Schematic {
  collection: string;
  version?: string;
  name: string;
  options?: any;
}

@Injectable()
export class SchematicsSequenceEstimator {
  constructor(private instructor: Instructor) { }

  async estimate(schematicSeq: Schematic[]): Promise<Schematic[]> {
    const inputs = [this.instructor.buildInputJson(schematicSeq)];
    const outputs = await this.instructor.instruct(inputs, this.buildInstructions(), ['output.json']);
    const file = outputs.find((output) => output.path === 'output.json');
    const content = file.content.toString();
    return JSON.parse(content).slice(schematicSeq.length);
  }

  protected buildInstructions(): string {
    return `Output an array that extends the \`input.json\` array with next commands.`;
  }

}

import chalk from 'chalk';

const HEAD = `${chalk.black.bgYellow.bold(' SX ')} `;

interface Data {
  status: 'answered' | string,
  prompt: string;
  suggest: string;
  answer: string;
}

export class Renderer {
  buildMessage({status, answer, prompt, suggest}: Data): string {
    return `${HEAD}${status === 'answered' ? chalk.cyan(answer) : prompt + chalk.dim(suggest)}`;
  }
}

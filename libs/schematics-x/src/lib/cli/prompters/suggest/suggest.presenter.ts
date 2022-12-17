import chalk from 'chalk';
import { State } from "./suggest.store";

const HEAD = `${chalk.black.bgYellow.bold(' SX ')} `;

export class SuggestPresenter {
  present({prompt, suggest, debugs, status, answer, cursor}: State) {
    const message = `${HEAD}${status === 'answered' ? chalk.cyan(answer) : prompt + chalk.dim(suggest)}`;
    const DEBUG_MESSAGE = `(${cursor.cols}, ${cursor.rows})\n`;
    const pad = (arr: any[], n: number) => {
      while(arr.length < n) { arr.push(''); }
      return arr;
    };

    const DEBUG_MESSAGES = pad(debugs, 5).slice(-5).map(debug => `${chalk.white.bgGray('[DEBUG]')}: ${debug.slice(0, 100)}`).join('\n');
    return {
      content: `${message}`,
      bottomContent: false ? '' : '\n' + DEBUG_MESSAGE + DEBUG_MESSAGES,
      cursor: { cols: cursor.cols - suggest.length, rows: cursor.rows },
    }
  }
}

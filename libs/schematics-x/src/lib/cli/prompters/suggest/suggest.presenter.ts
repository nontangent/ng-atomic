import chalk from 'chalk';
import { State } from "./suggest.store";


const pad = (arr: any[], n: number) => {
  while(arr.length < n) { arr.push(''); }
  return arr;
};


const BUILD_DEBUG_MESSAGES = (debugs: string[]) => {
  return pad(debugs, 5).slice(-5).map(debug => `${chalk.white.bgGray('[DEBUG]')} ${debug.slice(0, 100)}`).join('\n');;
}

export class SuggestPresenter {
  present({prompt, suggest, debugs, status, answer, cursor}: State) {
    const message = `${this.HEAD} ${status === 'answered' ? chalk.cyan(answer) : prompt + chalk.dim(suggest)}`;
    const DEBUG_MESSAGE = `(${cursor.cols}, ${cursor.rows})\n`;
    return {
      content: `${message}`,
      bottomContent: status === 'answered' ? '' : '\n' + DEBUG_MESSAGE + BUILD_DEBUG_MESSAGES(debugs),
      cursor: { cols: cursor.cols - suggest.length, rows: cursor.rows },
    }
  }

  get HEAD() {
    return `${chalk.black.bgYellow.bold(' SX ')}`;
  }
}

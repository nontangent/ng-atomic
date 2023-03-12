// import { Inject, Injectable, InjectionToken, Optional } from '@nx-ddd/core';
// import chalk from 'chalk';
// import { DEBUG } from '../../workflow-runner/handlers';
// import { State } from './suggest.store';

// const pad = (arr: any[], n: number) => {
//   while(arr.length < n) { arr.push(''); }
//   return arr;
// };


// const BUILD_DEBUG_MESSAGES = (debugs: string[]) => {
//   return pad(debugs, 5).slice(-5).map(debug => `${chalk.white.bgGray('[DEBUG]')} ${debug.slice(0, 100)}`).join('\n');;
// }

// export const SX_PATH = new InjectionToken('[schematics-x] Path');

// @Injectable()
// export class SuggestPresenter {
//   constructor(
//     @Optional() @Inject(DEBUG) protected debug?: boolean,
//     @Optional() @Inject(SX_PATH) protected path?: string,
//   ) {
//     this.debug = false;
//   }

//   present({prompt, suggest, debugs, status, answer, cursor}: State) {
//     const message = `${this.HEAD} ${status === 'answered' ? chalk.cyan(answer) : prompt + chalk.dim(suggest)}`;
//     let DEBUG_MESSAGE = '';
//     if (this.debug) {
//       DEBUG_MESSAGE += BUILD_DEBUG_MESSAGES(debugs);
//     }
    
//     DEBUG_MESSAGE += [...Array(1)].map(() => '\n').join('');
//     DEBUG_MESSAGE += chalk.bgCyan.white(`Ln ${cursor.rows}, Col ${cursor.cols}   PATH: ${this.path}`);

//     return {
//       content: `${message}`,
//       bottomContent: status === 'answered' ? '' : '\n' + DEBUG_MESSAGE,
//       cursor: { cols: cursor.cols - suggest.length, rows: cursor.rows },
//     }
//   }

//   get HEAD() {
//     return `${chalk.black.bgYellow.bold(' SX ')}`;
//   }
// }

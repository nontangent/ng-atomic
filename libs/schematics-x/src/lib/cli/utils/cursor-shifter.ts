import { Interface } from 'readline';
import { Cursor } from '../renderer';

export class CursorShifter {
  protected shift: Cursor = {rows: 0, cols: 0};

  constructor(private rl: Interface) { }

  get line() {
    return this.rl.line;
  }
  get output() {
    return (this.rl as any).output;
  }

  setShift(shift: Cursor) {
    this.shift = shift;
  }

  setPrompt(prompt: string) {
    return this.rl.setPrompt(prompt);
  }

  _getCursorPos() {
    const {cols, rows} = this.rl.getCursorPos();
    return { cols: cols + this.shift.cols, rows: rows + this.shift.rows};
  }

  getCursorPos() {
    return this._getCursorPos();
  }
}


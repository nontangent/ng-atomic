import { Interface } from 'readline';

export class CursorShifter {
  protected shift = 0;

  constructor(private rl: Interface) { }

  get line() {
    return this.rl.line;
  }
  get output() {
    return (this.rl as any).output;
  }

  setShift(shift: number) {
    this.shift = shift;
  }

  setPrompt(prompt: string) {
    return this.rl.setPrompt(prompt);
  }

  _getCursorPos() {
    const {cols, rows} = this.rl.getCursorPos();
    return { cols: cols + this.shift, rows };
  }

  getCursorPos() {
    return this._getCursorPos();
  }
}


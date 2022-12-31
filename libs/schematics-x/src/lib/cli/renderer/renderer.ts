import { Inject, Injectable, InjectionToken } from "@nx-ddd/core";
import ScreenManager from "inquirer/lib/utils/screen-manager";
import { Interface } from "readline";
import { CursorShifter } from "../utils/cursor-shifter";

export class SxScreen {
  constructor(
    protected rl: Interface,
    protected cs: CursorShifter,
    protected screen: ScreenManager
  ) { }
  
  get line() {
    return this.rl.line;
  }

  get cursor(): Cursor {
    return this.cs.getCursorPos();
  }

  setShift(n: number) {
    this.cs.setShift(n);
  }

  clearLine(): void {
    (this.rl as any).clearLine();
  }

  write(prompt: string) {
    this.rl.write(prompt);
  }

  render(content: string, bottomContent: string): void {
    this.screen.render(content, bottomContent);
  }

}

export interface Cursor {
  cols: number;
  rows: number;
}

export const SX_SCREEN = new InjectionToken('[schematics-x] Screen');

@Injectable()
export class Renderer {
  constructor(
    @Inject(SX_SCREEN) protected screen: SxScreen,
  ) { }

  get readline(): string {
    return this.screen.line;
  }

  get cursor (): Cursor {
    return this.screen.cursor;
  }

  setShift(cursor: Cursor) {
    this.screen.setShift(cursor.cols - this.cursor.cols);
  }

  render({content, bottomContent}: {
    content: string,
    bottomContent: string
  }): void {
    this.screen.render(content, bottomContent);
  };

  clearLine(): void {
    this.screen.clearLine();
  }

  write(prompt: string) {
    this.screen.write(prompt);
  }
}
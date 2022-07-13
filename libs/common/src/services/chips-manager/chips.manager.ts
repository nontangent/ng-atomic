import { Injectable } from "@angular/core";

@Injectable()
export class ChipsManager {
  private _chips: string[] = [];

  setValue(value: string): void {
    this._chips = value.split(' ').filter(chip => !!chip);
  }

  getValue(): string {
    return this._chips.join(' ');
  }

  remove(value: string): void {
    this._chips = this.chips.filter(chip => chip !== value);
  }

  add(chip: string): void {
    const value = (chip || '').trim();
    this._chips = [...this.chips, value];
  }

  get chips(): string[] {
    return this._chips;
  }
}

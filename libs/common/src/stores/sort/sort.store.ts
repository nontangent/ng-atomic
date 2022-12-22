import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";

export interface SortState {
  key: string;
  order: 'asc' | 'desc';
}

@Injectable()
export class SortStore extends ComponentStore<SortState> {
  constructor() {super({key: null, order: 'asc'})}

  get state() { return this.get(); }
  get key() { return this.get().key; }
  get order() { return this.get().order; }

  state$ = this.select(state => state);
  key$ = this.select(state => state.key);
  order$ = this.select(state => state.order);

  setKey = this.updater((state, key: string) => ({...state, key}));
  setOrder = this.updater((state, order: 'asc' | 'desc') => ({...state, order}));
 
  changeSortFromEvent(key: string, state: SortState = this.state) {
    const reverse = (order: 'asc' | 'desc') => order === 'asc' ? 'desc' : 'asc';
    const order = key === state.key ? reverse(state.order) : 'asc';
    this.setKey(key);
    this.setOrder(order);
  }
}

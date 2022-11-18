import { ComponentStore } from "@ngrx/component-store";

export interface SelectionState {
  idSet: Set<string>;
}

export class SelectionStore extends ComponentStore<SelectionState> {
  get idSet(): Set<string> { return this.get(state => state.idSet); }

  setIdSet = this.updater((state, idSet: Set<string>) => ({...state, idSet}));

  addIds = (ids: string[]) => this.setIdSet(new Set([...this.idSet, ...ids]));
  addId = (id: string) => this.addIds([id]);
  
  removeId = (id: string) => this.setIdSet(new Set([...this.idSet].filter(_id => _id !== id)));
}
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export interface SelectionState {
  idSet: Set<string>;
  initialIdSet: Set<string> | null;

}

@Injectable()
export class SelectionStore extends ComponentStore<SelectionState> {
  get idSet(): Set<string> { return this.get(state => state.idSet); }
  get initialIdSet(): Set<string> { return this.get(state => state.initialIdSet); }

  constructor() {
    super({idSet: new Set(), initialIdSet: null});
  }

  setIdSet = this.updater((state, idSet: Set<string>) => ({...state, idSet}));
  setInitialIdSet = this.updater((state, initialIdSet: Set<string>) => ({...state, initialIdSet}));

  addIds = (ids: string[]) => this.setIdSet(new Set([...this.idSet, ...ids]));
  addId = (id: string) => this.addIds([id]);
  
  removeId = (id: string) => this.setIdSet(new Set([...this.idSet].filter(_id => _id !== id)));
  toggleId = (id: string)  => this.idSet.has(id) ? this.removeId(id) : this.addId(id);

  getSelectedAndUnselected(): [Set<string>, Set<string>] {
    const unselectedIdSet = new Set([...this.initialIdSet].filter(id => !this.idSet.has(id)));
    return [this.idSet, unselectedIdSet];
  }

  filterBySelectedIds<E extends {id: string}>(entities: E[]): E[] {
    return entities.filter(({id}) => this.idSet.has(id));
  }
}
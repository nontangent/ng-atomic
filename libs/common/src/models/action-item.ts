import { Action } from "./action";

export interface ActionItem<T = any> extends Action<T> {
  name: string;
  icon?: string;
  color?: string;
}

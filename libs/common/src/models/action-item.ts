export interface ActionItem<ID = number | string> {
  id: ID;
  name: string;
  icon?: string;
  color?: string;
}

export type ActionItemEvent<T = any> = [ActionItem, T];

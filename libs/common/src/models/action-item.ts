export interface ActionItem {
  id: number | string;
  name: string;
  icon?: string;
  color?: string;
}

export type ActionItemEvent<T = any> = [ActionItem, T];

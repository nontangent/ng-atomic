export interface ActionItem {
  id: number | string;
  name: string;
  icon?: string;
}

export type ActionItemEvent<T = any> = [ActionItem, T];

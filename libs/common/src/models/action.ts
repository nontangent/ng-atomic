export interface Action<T = any> {
  id: string;
  payload?: T;
  name?: string;
  icon?: string;
  disabled?: boolean;
}

export type Actions = ((...args: any[]) => Action[]) | Action[];

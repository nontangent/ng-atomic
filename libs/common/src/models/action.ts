export interface Action<T = any> {
  id: string;
  payload?: T;
}

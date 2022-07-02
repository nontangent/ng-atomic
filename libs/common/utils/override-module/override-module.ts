import { NgModule } from "@angular/core";

export const overrideModule = (Module, overrideObj: Partial<NgModule>) => {
  return NgModule(Object.assign({...(Module as any).ɵmod}, overrideObj))(function _() {});
}

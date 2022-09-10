import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMolecule } from './header.molecule';



@NgModule({
  declarations: [
    HeaderMolecule
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderMolecule
  ]
})
export class HeaderModule { }

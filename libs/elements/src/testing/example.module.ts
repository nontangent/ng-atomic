import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExampleComponent } from './example.component';
import { ElementsModule } from '../elements-module';


@NgModule({
  declarations: [ExampleComponent],
  imports: [BrowserModule],
})
export class ExampleModule { }

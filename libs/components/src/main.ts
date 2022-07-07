import { enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementsLoader } from './elements-loader';


enableProdMode();

(window as any).ElementsLoader ??= new ElementsLoader({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  platformFactory: () => platformBrowserDynamic(),
});

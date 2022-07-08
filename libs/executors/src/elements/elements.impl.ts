import { executeBrowserBuilder, ExecutionTransformer } from "@angular-devkit/build-angular";
import { BuilderOutput, createBuilder } from "@angular-devkit/architect";
import { Observable } from 'rxjs';
import { Configuration } from "webpack";

export interface Transforms {
  webpackConfiguration: ExecutionTransformer<Configuration>;
}

const TRANSFORMS: Transforms = {
  webpackConfiguration: (config: any) => {
    console.debug('config:', config);
    // delete config.entry['polyfills'];
    delete config.entry['polyfills-es5'];
    delete config.entry['styles'];
    // delete config.optimization.runtimeChunk;
    // delete config.optimization.splitChunks;
    config.output.publicPath = 'http://127.0.0.1:8080/elements/';
    return config;
  }
}

export function buildElements(options: any, context: any): Observable<BuilderOutput> {
  return executeBrowserBuilder(options, context, TRANSFORMS);
}

export default createBuilder<any>(buildElements);
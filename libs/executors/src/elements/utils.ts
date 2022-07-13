import { ExecutionTransformer } from "@angular-devkit/build-angular";
import { Configuration } from "webpack";

export interface Transforms {
  webpackConfiguration: ExecutionTransformer<Configuration>;
}

export const transformsFactory = (options: any) => ({
  webpackConfiguration: (config: any) => {
    delete config.entry['polyfills'];
    delete config.optimization.runtimeChunk;
    delete config.optimization.splitChunks;
    config.output.publicPath = options.publicPath ?? `http://${options.host}:${options.port}/`;
    return config;
  }
});

import { executeDevServerBuilder } from "@angular-devkit/build-angular";
import { BuilderContext, BuilderOutput, createBuilder } from "@angular-devkit/architect";
import { from, map, Observable, switchMap } from 'rxjs';
import { transformsFactory } from "../utils";
import { targetFromTargetString } from '@angular-devkit/architect';

export function run(
  options: any, 
  context: BuilderContext, 
  executeBuilder: typeof executeDevServerBuilder
): Observable<BuilderOutput> {
  const browserTarget = targetFromTargetString(options.browserTarget);

  const setup = async () => {
    const rawBrowserOptions = (await context.getTargetOptions(browserTarget));
    console.debug('rawBrowserOptions:', rawBrowserOptions);
  };

  return from(setup()).pipe(
    switchMap(() => executeBuilder(options, context,  transformsFactory(options)).pipe(
      map(output => output)
    )),
  );
}

export function _executeDevServerBuilder(
  options: any,
  context: BuilderContext
): Observable<BuilderOutput> {
  return run(options, context, executeDevServerBuilder);
}

export default createBuilder<any>(_executeDevServerBuilder);

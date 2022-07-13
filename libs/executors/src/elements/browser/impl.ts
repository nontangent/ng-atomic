import { executeBrowserBuilder as _executeBrowserBuilder } from "@angular-devkit/build-angular";
import { BuilderOutput, createBuilder } from "@angular-devkit/architect";
import { Observable } from 'rxjs';
import { transformsFactory } from "../utils";

export function executeBrowserBuilder(options: any, context: any): Observable<BuilderOutput> {
  return _executeBrowserBuilder(options, context, transformsFactory(options));
}

export default createBuilder<any>(executeBrowserBuilder);

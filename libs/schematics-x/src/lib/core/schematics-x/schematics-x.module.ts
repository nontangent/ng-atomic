import { NxModule } from '@nx-ddd/core';
import { Provider } from '@nx-ddd/core/di/interface/provider';
import { OutputFileEntryModule, OutputFilePathsModule, RelatedFilePathsModule } from '../estimators';
import { Glob, SchematicsX, ScopeResolver } from './schematics-x';

@NxModule({
  imports: [
    OutputFileEntryModule,
    OutputFilePathsModule,
    RelatedFilePathsModule,
  ],
  providers: [Glob, ScopeResolver, SchematicsX]
})
export class SchematicsXModule {
  static forRoot(extraProviders: Provider[] = []) {
    return {
      nxModule: SchematicsXModule,
      providers: extraProviders
    };
  }
}

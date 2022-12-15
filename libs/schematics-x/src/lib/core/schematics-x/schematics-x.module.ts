import { NxModule } from '@nx-ddd/core';
import { OutputFileEntryModule, OutputFilePathsModule, RelatedFilePathsModule } from '../estimators';
import { Glob, SchematicsX, ScopeResolver } from './schematics-x';

@NxModule({
  imports: [
    OutputFileEntryModule,
    OutputFilePathsModule,
    RelatedFilePathsModule,
  ],
  providers: [SchematicsX, Glob, ScopeResolver]
})
export class SchematicsXModule { }

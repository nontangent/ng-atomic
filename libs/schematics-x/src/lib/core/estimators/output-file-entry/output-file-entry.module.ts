import { NxModule } from '@nx-ddd/core';
import { OutputFileEntryEstimator } from './output-file-entry.estimator';

@NxModule({
  imports: [],
  providers: [OutputFileEntryEstimator],
})
export class OutputFileEntryModule { }

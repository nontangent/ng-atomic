import { NxModule } from '@nx-ddd/core';
import { OutputFilePathsEstimator } from './output-file-paths.estimator';

@NxModule({
  imports: [],
  providers: [OutputFilePathsEstimator],
})
export class OutputFilePathsModule { }

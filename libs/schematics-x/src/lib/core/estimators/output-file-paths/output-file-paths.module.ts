import { NxModule } from '@nx-ddd/core';
import { InstructorModule } from '../../instructor';
import { OutputFilePathsEstimator } from './output-file-paths.estimator';

@NxModule({
  imports: [InstructorModule],
  providers: [OutputFilePathsEstimator],
})
export class OutputFilePathsModule { }

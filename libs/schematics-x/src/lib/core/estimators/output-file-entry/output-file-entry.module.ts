import { NxModule } from '@nx-ddd/core';
import { InstructorModule } from '../../instructor';
import { OutputFileEntryEstimator } from './output-file-entry.estimator';

@NxModule({
  imports: [InstructorModule],
  providers: [OutputFileEntryEstimator],
})
export class OutputFileEntryModule { }

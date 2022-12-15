import { NxModule } from '@nx-ddd/core';
import { InstructorModule } from '../../instructor';
import { SchematicsSequenceEstimator } from './schematics-sequence.estimator';

@NxModule({
  imports: [
    InstructorModule,
  ],
  providers: [
    SchematicsSequenceEstimator,
  ],
})
export class SchematicsSequenceModule { }

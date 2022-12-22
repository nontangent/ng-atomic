import { NxModule } from "@nx-ddd/core";
import { RelatedFilePathsEstimator } from "./related-file-paths.estimator";

@NxModule({
  providers: [RelatedFilePathsEstimator]
})
export class RelatedFilePathsModule {}

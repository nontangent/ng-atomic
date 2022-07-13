import { convertNxExecutor } from '@nrwl/devkit';
import { packageExecutor } from './impl';

export default convertNxExecutor(packageExecutor);

import { chain, Rule, Tree, template, move, url, apply, mergeWith, noop } from '@angular-devkit/schematics';
import { addSchematicsConfig, addPathsToTsConfig, setDefaultCollection, addStyleIncludePath } from '../_utilities';

export const setup = (options: any): Rule => chain([
	addSchematicsConfig(options, 'atom'),
	addSchematicsConfig(options, 'molecule'),
	addSchematicsConfig(options, 'organism'),
	addSchematicsConfig(options, 'template'),
	setDefaultCollection(),
	addStyleIncludePath(options),
	(host: Tree) => host.exists(`${options.stylesDir}/atomic`) ? noop() : addStyleFiles(options),
	addPathsToTsConfig(options),
]);

const addStyleFiles = (options: any) => mergeWith(apply(url('./files'), [template({}), move(options.stylesDir)]));

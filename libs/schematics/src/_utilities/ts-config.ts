import { Tree } from '@angular-devkit/schematics';
import { set } from 'lodash';
import { overwrite } from './overwrite';

export const addPathsToTsConfig = ({componentsDir}: any) => (host: Tree) => {
	return overwrite(host, host.exists('tsconfig.base.json') ? 'tsconfig.base.json' : 'tsconfig.json', json => {
		set(json, `compilerOptions.paths.@components`, [componentsDir]);
		set(json, `compilerOptions.paths.@components/*`, [`${componentsDir}/*`]);
		return json;
	});
};


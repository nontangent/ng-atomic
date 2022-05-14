import { Tree } from '@angular-devkit/schematics';
import { get, set } from 'lodash';
import { overwrite } from './overwrite';

const PACKAGE_NAME = '@ng-atomic/schematics';

export const addSchematicsConfig = ({project, componentsDir}: any, type: string) => (host: Tree): Tree => {
	const query = `projects.${project}.schematics.${PACKAGE_NAME}:${type}`;
	return overwrite(host, 'angular.json', json => (set(json, query, {'path': `${componentsDir}/${type}s`}), json));
};

export const setDefaultCollection = () => (host: Tree) => {
	return overwrite(host, 'angular.json', json => (set(json, `cli.defaultCollection`, PACKAGE_NAME), json));
}

export const addStyleIncludePath = ({project, stylesDir}: any) => (host: Tree) => {
	const query = `projects.${project}.architect.build.options.stylePreprocessorOptions.includePaths`;
	return overwrite(host, 'angular.json', json => (set(json, query, [...new Set(get(json, query)).add(stylesDir)]), json));
};

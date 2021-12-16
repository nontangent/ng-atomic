import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Rule, externalSchematic, Tree, chain } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { validateHtmlSelector, validateName } from '@schematics/angular/utility/validation';
import { buildDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace';
import { join } from 'path';
import * as format from 'string-template';
import { saveFile } from '../utils';

const buildSelector = ({selector, prefix, name}: any, projectPrefix: string) =>
	selector ?? ((prefix ? `${prefix}-` : projectPrefix ? `${projectPrefix}-` : '') + dasherize(name));

const addHostCssVariable = (options: any): Rule => async (host: Tree) => {
	const workspace = await getWorkspace(host);
	const project = workspace.projects.get(options.project as string);
	options.path ??= project && buildDefaultPath(project);

	const {name, path, type, style, styleHeader} = options = {...options, ...parseName(options.path, options.name)};
	const selector =  buildSelector(options, project?.prefix ?? '');

	validateName(name);
	validateHtmlSelector(selector);

	const stylePath = join(path, dasherize(name), `${dasherize(name)}.${type}.${style}`);
	const HEADER = format(styleHeader, {name: dasherize(name)});

	return (host: Tree) => saveFile(host, stylePath, (src: string): string => `${HEADER}${src}`);
};

export const component = (options: any): Rule => () => chain([
	externalSchematic('@schematics/angular', 'component', {...options}),
	addHostCssVariable({...options}),
]);

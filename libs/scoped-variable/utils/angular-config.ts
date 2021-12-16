import { Tree } from '@angular-devkit/schematics';

export function setDefaultCollectionToAngularJson(
  host: Tree,
  defaultCollection: string
): Tree {
	return updateAngularJson(host, (json: any) => {
		if (!json.cli) json.cli = {};
    json.cli.defaultCollection = defaultCollection;
		return json
	});
}

export function addSchematicToAngularJson(
	host: Tree,
	projectName: string,
	collection: string,
	schematic: string,
 	options: any,
): Tree {
	return updateAngularJson(host, (json: any) => {
		if (!json.projects[projectName].schematics) {
			json.projects[projectName].schematics = {}
		}

		json.projects[projectName].schematics[`${collection}:${schematic}`] = options;

		return json;
	});
}

export function addStyleIncludePathToAngularJson(
	host: Tree,
	projectName: string,
	path: string
): Tree {
	return updateAngularJson(host, (json: any) => {
		const options = json.projects[projectName].architect.build.options;
		if (!options.stylePreprocessorOptions) {
			options.stylePreprocessorOptions = {};
		}

		if (!options.stylePreprocessorOptions.includePaths) {
			options.stylePreprocessorOptions.includePaths = [];
		}

		const includePaths = new Set(options.stylePreprocessorOptions.includePaths);
		includePaths.add(path);
		options.stylePreprocessorOptions.includePaths = Array.from(includePaths);
		json.projects[projectName];
		return json;
	});
}

export function updateAngularJson(host: Tree, callback: any) {
	if (host.exists('angular.json')) {
		let json = JSON.parse(host.read('angular.json')!.toString('utf-8'));
		json = callback(json);
		host.overwrite('angular.json', JSON.stringify(json, null, 2));
	}
	return host;
}

export function saveFile(
	host: Tree, 
	path: string, 
	callback: any
): Tree {
	
	if (host.exists(path)) {
		const src = host.read(path)!.toString('utf-8');
		const dest = callback(src);
		host.overwrite(path, dest);
	} else {
		host.create(path, callback(''));
	}

	return host;
}

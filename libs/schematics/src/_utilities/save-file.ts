import { Tree } from '@angular-devkit/schematics';

export function saveFile(host: Tree, path: string, callback: (str: string) => string): Tree {
	host.exists(path) 
		? host.overwrite(path, callback(host.read(path)!.toString('utf-8'))) 
		: host.create(path, callback(''));
	return host;
}
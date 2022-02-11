
import { Tree } from '@angular-devkit/schematics';
import { parse } from "jsonc-parser";

export function overwrite(host: Tree, file: string, callback: (json: object) => object): Tree {
	if (!host.exists(file)) return host;
	const json = parse(host.read(file)!.toString('utf-8'));
	host.overwrite(file, JSON.stringify(callback(json), null, 2));
	return host;
}

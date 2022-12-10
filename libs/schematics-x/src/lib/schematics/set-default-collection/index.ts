import { Rule, Tree } from "@angular-devkit/schematics";
import { set } from 'lodash';

interface Schema {
  collectionName: string;
}

const CONFIG_PATHS = ['angular.json', 'nx.json'];

export const setDefaultCollection = ({collectionName}: Schema): Rule => {
  return (tree: Tree) => {
    const configPath = CONFIG_PATHS.find(path => tree.exists(path)); 
    const config = readJsonInTree(tree, configPath);
    writeJsonInTree(tree, configPath, set(config, 'cli.defaultCollection', collectionName));
    return tree;
  };
}

function readJsonInTree(tree: Tree, path: string): any {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new Error(`Cannot find ${path}`);
  }
  return JSON.parse(buffer.toString());
}

function writeJsonInTree(tree: Tree, path: string, json: any): void {
  tree.overwrite(path, JSON.stringify(json, null, 2));
}

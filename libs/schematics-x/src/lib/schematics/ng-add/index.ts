import { Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(): Rule {
  return (_: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return schematic('set-default-collection', {
      collectionName: 'schematics-x',
    });
  };
}

import type { ExecutorContext } from '@nrwl/devkit';
import { readCachedProjectGraph } from '@nrwl/devkit';
import {
  calculateProjectDependencies,
  checkDependentProjectsHaveBeenBuilt,
  createTmpTsConfig,
  DependentBuildableProjectNode,
  updateBuildableProjectPackageJsonDependencies,
} from '@nrwl/workspace/src/utilities/buildable-libs-utils';
import { NX_ENTRY_POINT_PROVIDERS } from '@nrwl/angular/src/executors/package/ng-packagr-adjustments/ng-package/entry-point/entry-point.di';
import { nxProvideOptions } from '@nrwl/angular/src/executors/package/ng-packagr-adjustments/ng-package/options.di';
import {
  NX_PACKAGE_PROVIDERS,
  NX_PACKAGE_TRANSFORM,
} from '@nrwl/angular/src/executors/package/ng-packagr-adjustments/ng-package/package.di';
import type { NgPackagr } from 'ng-packagr';
import { resolve } from 'path';
import { from } from 'rxjs';
import { eachValueFrom } from 'rxjs-for-await';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import type { BuildAngularLibraryExecutorOptions } from './schema';
import { readFileSync } from 'fs';

async function initializeNgPackagr(
  options: BuildAngularLibraryExecutorOptions,
  context: ExecutorContext,
  projectDependencies: DependentBuildableProjectNode[]
): Promise<NgPackagr> {
  const packager = new (await import('ng-packagr')).NgPackagr([
    ...NX_PACKAGE_PROVIDERS,
    ...NX_ENTRY_POINT_PROVIDERS,
    nxProvideOptions({
      tailwindConfig: options.tailwindConfig,
      watch: options.watch,
    }),
  ]);

  console.debug('ptoject:', options.project);

  packager.forProject(resolve(context.root, options.project));
  packager.withBuildTransform(NX_PACKAGE_TRANSFORM.provide);

  if (options.tsConfig) {
    const tsConfigPath = createTmpTsConfig(
      options.tsConfig,
      context.root,
      context.workspace.projects[context.projectName!].root,
      projectDependencies
    );
    packager.withTsConfig(tsConfigPath);
  }

  return packager;
}

/**
 * Creates an executor function that executes the library build of an Angular
 * package using ng-packagr.
 * @param initializeNgPackagr function that returns an ngPackagr instance to use for the build.
 */
export function createLibraryExecutor(
  initializeNgPackagr: (
    options: BuildAngularLibraryExecutorOptions,
    context: ExecutorContext,
    projectDependencies: DependentBuildableProjectNode[]
  ) => Promise<NgPackagr>
) {
  return async function* (
    options: BuildAngularLibraryExecutorOptions,
    context: ExecutorContext
  ) {
    const { target, dependencies, topLevelDependencies } =
      calculateProjectDependencies(
        readCachedProjectGraph(),
        context.root,
        context.projectName!,
        context.targetName!,
        context.configurationName!
      );
    if (
      !checkDependentProjectsHaveBeenBuilt(
        context.root,
        context.projectName!,
        context.targetName!,
        dependencies
      )
    ) {
      return Promise.resolve({ success: false });
    }

    function updatePackageJson(): void {
      if (
        topLevelDependencies.length > 0 &&
        options.updateBuildableProjectDepsInPackageJson
      ) {
        updateBuildableProjectPackageJsonDependencies(
          context.root,
          context.projectName!,
          context.targetName!,
          context.configurationName!,
          target,
          topLevelDependencies,
          options.buildableProjectDepsInPackageJsonType
        );
      }
    }

    if (options.watch) {
      return yield* eachValueFrom(
        from(initializeNgPackagr(options, context, dependencies)).pipe(
          switchMap((packagr) => packagr.watch()),
          tap(() => updatePackageJson()),
          mapTo({ success: true })
        )
      );
    }

    return from(initializeNgPackagr(options, context, dependencies))
      .pipe(
        switchMap((packagr) => packagr.build()),
        tap(() => updatePackageJson()),
        mapTo({ success: true })
      )
      .toPromise();
  };
}

export const packageExecutor = createLibraryExecutor(initializeNgPackagr);

export default packageExecutor;

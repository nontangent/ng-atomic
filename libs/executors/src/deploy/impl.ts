import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { run } from 'angular-cli-ghpages/engine/engine';
import { Schema } from './schema';

export async function executeDeploy(options: Schema, context: BuilderContext): Promise<BuilderOutput> {
  try {
    await run(options.outputPath, options, context.logger);
  } catch (e: any) {
    context.logger.error('❌ An error occurred when trying to deploy:');
    context.logger.error(e.message);
    return { success: false };
  }

  return { success: true };
}

export default createBuilder<any>(executeDeploy);

export interface Schema {
  baseHref?: string;
  outputPath: string;
  noBuild: boolean;
  repo?: string;
  message: string;
  branch: string;
  name?: string;
  email?: string;
  noSilent: boolean;
  noDotfiles: boolean;
  cname?: string;
  dryRun: boolean;
}
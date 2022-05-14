export interface Schema {
  path?: string;
  project?: string;
  name?: string;
  displayBlock?: string;
  inlineTemplate?: string;
  viewEncapsulation?: "Emulated" | "Native" | "None" | "ShadowDom";
  changeDetection?: "Default" | "OnPush";
  prefix?: string;
  style?: string;
  type?: string;
  skipTests?: boolean;
  flat?: boolean;
  skipImport?: boolean;
  selector?: string;
  skipSelector?: boolean;
  module?: string;
  export?: boolean;
  styleHeader?: string;
  useTypeAsExtension: boolean;
}

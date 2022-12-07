import { FileEntry } from "@angular-devkit/schematics";

export const DUMMY_FILE_ENTRY: FileEntry = {
  path: '/__dummy.json' as any,
  content: Buffer.from('{"this": "is dummy file for SchematicsX"}'),
}

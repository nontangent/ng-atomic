import { FileEntry } from "@angular-devkit/schematics";

const countFileToken = (entry: FileEntry) => {
  return entry.path.length + entry.content.toString().length;
}

const countFilesToken = (entries: FileEntry[]) => {
  return entries.reduce((count, entry) => {
    return count + countFileToken(entry);
  }, 0);
};

export class InputFileEntriesReducer {
  reduce(_inputFileEntries: FileEntry[], instructions: string,  size: number) {
    if (countFilesToken(_inputFileEntries) <= size) {
      return _inputFileEntries;
    }
    const inputs = _inputFileEntries.sort((a, b) => countFileToken(a) - countFileToken(b))
    .reduce((entries, entry) => {
      if (countFilesToken([...entries, entry]) < size - instructions.length) {
        return [...entries, entry];
      }
      return entries;
    }, [] as FileEntry[]);
    
    console.warn(`Minimized input file entries to under ${size} token`);
    console.warn(`from ${_inputFileEntries.length} files to ${inputs.length} files.`);

  }
}
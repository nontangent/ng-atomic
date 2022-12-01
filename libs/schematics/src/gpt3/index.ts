import { Rule, Tree, chain, DirEntry, FileEntry } from '@angular-devkit/schematics';
import { Schema } from '../atomic-component/schema';
import { createDefaultPath } from '@schematics/angular/utility/workspace';
import { Configuration, OpenAIApi  } from 'openai';
import { join, parse } from 'path';
import { getEstimateSimilarFilePaths } from './helpers';

const config = new Configuration({apiKey: process.env['OPEN_AI_TOKEN']});
const openai = new OpenAIApi(config);

export const gpt3 = (options: Schema): Rule => async (tree: Tree) => {
	options.path = join(await createDefaultPath(tree, options.project), options?.path ?? '');
  
  const files = getFiles(tree.root);
  const path = join(tree.root.path, options.path, options.name);
  const estimatedFiles = parse(path).ext.length ? [path] : await getPredicatedFiles(files, path);

  for (const file of estimatedFiles) {
    const fileEntries = getEstimateSimilarFilePaths(file, files).map(file => tree.get(file));
    const fileEntry = await getPredicatedFileEntry(file, fileEntries);
    tree.create(file, fileEntry.content);
  }

	return chain([]);
};

async function getPredicatedFiles(files: string[], dirPath: string): Promise<string[]> {
  const fileStart = dirPath.split('/').slice(-1)[0];
  const prompt = makeDirectoryPrompt(files, join(dirPath, fileStart));
  const res = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt,
    temperature: 0,
    max_tokens: 512,
    stop: '\n\`\`\`',
  });
  const results = completeToJson(`${prompt}${res.data.choices?.[0].text}`);
  return results.filter(result => result.startsWith(dirPath));
}

async function getPredicatedFileEntry(path: string, fileEntries: FileEntry[] = []): Promise<FileEntry> {
  const prompt = makeFilePrompt(fileEntries, path);
  const res = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt,
    temperature: 0,
    max_tokens: 256,
    stop: '\n\`\`\`',
  });
  const entries = parseCodeBlocks(`${prompt}${res.data.choices?.[0].text}`);
  return entries.find(entry => entry.path === path);
}

function makeDirectoryPrompt(files: string[], name: string): string {
  return `\n\`\`\`tree.json\n[\n${files.map(file => `\t\"${file}\",`).join('\n')}\n\t\"${name}`;
}

function makeFilePrompt(files: FileEntry[], path: string): string {
  return `${makeFileCodeBlocks(files)}\n\n\`\`\`${path}\n`;
}

function makeFileCodeBlocks(files: FileEntry[]): string {
  return files.map(file => makeFileCodeBlock(file.path, file.content.toString())).join('\n\n');
}

function makeFileCodeBlock(name: string, content: string): string {
  return `\`\`\`${name}\n${content}\n\`\`\``;
}

export function completeToJson(text: string): string[] {
  while(text.length) {
    let suffixes = ['"]\n```', ']\n```', '\n```', '```', '``', '`', ''];

    for (const suffix of suffixes) {
      try {
        return parseJsonCodeBlock(text + suffix);
      } catch { }
    }

    text = text.slice(0, -1);
  }
}

export function parseJsonCodeBlock(text: string): string[] {
  const code = getCodeBlocks(text);
  return JSON.parse(code);
}

function getCodeBlocks(text: string): string {
  return text.match(/\`\`\`tree\.json\n([\s\S]*)\`\`\`/)?.[1];
}

export function parseCodeBlocks(text: string): FileEntry[] {
  return text.split('```').filter((_, i) => i % 2).map(code => {
    const [path, ...lines] = code.split('\n');
    return {path, content: Buffer.from(lines.join('\n'))} as FileEntry;
  });
}

function getFiles(dir: DirEntry): string[] {
  const files: string[] = [];
  walkDir(dir, (path, entry) => entry.subfiles.forEach(file => files.push(`${path}/${file}`)));
  return files;
}

function walkDir(dir: DirEntry, callback: (path: string, entry: DirEntry) => void, parent = '/') {
  dir.subdirs.forEach(path => {
    const entry = dir.dir(path);
    callback(join(parent, path), entry);
    walkDir(entry, callback, join(parent, path));
  });
}
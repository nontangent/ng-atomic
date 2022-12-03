import { FileEntry } from '@angular-devkit/schematics';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Instructor } from './instructor';

function loadFile(path: string): FileEntry {
  const file = readFileSync(join(__dirname, path));
  return {
    path: path as any,
    content: file,
  };
}

describe('Instructor', () => {

  let instructor: Instructor;

  beforeEach(() => {
    instructor = new Instructor();
  });

  it('should be defined', () => {
    expect(instructor).toBeDefined();
  });

  describe('convert()', () => {
    it('should convert', async () => {
      const input = loadFile('./_testing/tree.input.json');
      const expected = loadFile('./_testing/tree.expected.json');
      const instructions = 'Add "/root/components/profile" directory with estimated files and keep current file array.';
      const [output] = await instructor.instruct([input], instructions);
      expect(output).toBeTruthy();
      const body = output.content.toString();
      expect(JSON.parse(body)).toEqual(JSON.parse(expected.content.toString()));
    });
  });

});



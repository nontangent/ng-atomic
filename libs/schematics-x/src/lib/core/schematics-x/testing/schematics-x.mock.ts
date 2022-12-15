import { SchematicsX } from "../schematics-x";

export const mockSchematicsX: jest.Mocked<Partial<SchematicsX>> = {
  execute: jest.fn(),
}

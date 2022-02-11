import { filterByQuery } from './query.resolver';

describe('QueryResolver', () => {
  describe('status with string', () => {
    const items = [{ status: 'WIP' }, { status: 'DONE' }];

    it('status: WIP', () => {
      const expected = [{status: 'WIP'}];
      expect(filterByQuery(items, 'status: WIP')).toEqual(expected);
    });
  });

  describe('status with enum', () => {
    enum Status { WIP = 'WIP', DONE = 'DONE' }
    const items = [{status: Status.WIP}, {status: Status.DONE}];

    it('status: WIP', () => {
      const expected = [{status: 'WIP'}];
      expect(filterByQuery(items, 'status: WIP')).toEqual(expected);
    });
  })

  describe('status with enum and domain language', () => {
    enum Status { WIP = 'WIP', DONE = 'DONE' }
    const items = [{status: Status.WIP}, {status: Status.DONE}];

    it('status: WIP', () => {
      const expected = [{status: 'WIP'}];
      expect(filterByQuery(items, 'ステータス: WIP', {status: 'ステータス'})).toEqual(expected);
    });
  })
});
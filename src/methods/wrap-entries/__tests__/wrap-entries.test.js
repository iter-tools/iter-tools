import { wrapEntries } from '../../..';

describe('wrapEntries', () => {
  it('works with Map', () => {
    const mapEntries: Array<[string, string]> = [
      ['foo', 'foo'],
      ['bar', 'bar'],
    ];
    expect(Array.from(wrapEntries(new Map(mapEntries)))).toEqual(mapEntries);
  });

  it('works with null', () => {
    const i = wrapEntries(null);
    expect(Array.from(i)).toEqual([]);
  });
});

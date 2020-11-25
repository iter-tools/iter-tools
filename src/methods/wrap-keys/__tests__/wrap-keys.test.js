import { wrapKeys } from '../../..';

describe('wrapKeys', () => {
  it('works with Map', () => {
    const map = new Map([
      ['foo', 'bar'],
      ['fox', 'far'],
    ]);
    expect(Array.from(wrapKeys(map))).toEqual(['foo', 'fox']);
  });

  it('works with null', () => {
    const i = wrapKeys(null);
    expect(Array.from(i)).toEqual([]);
  });
});

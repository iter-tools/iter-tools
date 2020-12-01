import { wrapValues } from 'iter-tools-es';

describe('wrapValues', () => {
  it('works with Map', () => {
    const map = new Map([
      ['foo', 'bar'],
      ['fox', 'far'],
    ]);
    expect(Array.from(wrapValues(map))).toEqual(['bar', 'far']);
  });

  it('works with null', () => {
    const i = wrapValues(null);
    expect(Array.from(i)).toEqual([]);
  });
});

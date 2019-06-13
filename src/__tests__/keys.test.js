import { keys } from '..';

describe('keys', () => {
  it('works with Map', () => {
    const map = new Map([['foo', 'bar'], ['fox', 'far']]);
    expect(Array.from(keys(map))).toEqual(Array.from(map.keys()));
  });
  it('works with Objects', () => {
    const i = keys({ '1': 1, '2': 2 });
    expect(Array.from(i)).toEqual(['1', '2']);
  });
  it('can be reused', () => {
    const i = keys({ '1': 1, '2': 2 });
    expect(Array.from(i)).toEqual(['1', '2']);
    expect(Array.from(i)).toEqual(['1', '2']);
  });
  it('works with null', () => {
    const i = keys(null);
    expect(Array.from(i)).toEqual([]);
  });
});

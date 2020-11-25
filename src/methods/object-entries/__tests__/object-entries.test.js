import { objectEntries } from '../../..';

describe('objectEntries', () => {
  it('works with Objects', () => {
    const i = objectEntries({ 1: 1, 2: 2 });
    expect(Array.from(i)).toEqual([
      ['1', 1],
      ['2', 2],
    ]);
  });

  it('can be reused', () => {
    const i = objectEntries({ 1: 1, 2: 2 });
    expect(Array.from(i)).toEqual([
      ['1', 1],
      ['2', 2],
    ]);
    expect(Array.from(i)).toEqual([
      ['1', 1],
      ['2', 2],
    ]);
  });

  it('works with null', () => {
    const i = objectEntries(null);
    expect(Array.from(i)).toEqual([]);
  });

  it('throws with non-object', () => {
    const obj: any = 4;
    expect(() => objectEntries(obj)).toThrowErrorMatchingSnapshot();
  });
});

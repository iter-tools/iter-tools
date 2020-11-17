import { objectValues } from '@iter-tools/es';

describe('objectValues', () => {
  it('works with Objects', () => {
    const i = objectValues({ 1: 1, 2: 2 });
    expect(Array.from(i)).toEqual([1, 2]);
  });

  it('can be reused', () => {
    const i = objectValues({ 1: 1, 2: 2 });
    expect(Array.from(i)).toEqual([1, 2]);
    expect(Array.from(i)).toEqual([1, 2]);
  });

  it('works with null', () => {
    const i = objectValues(null);
    expect(Array.from(i)).toEqual([]);
  });

  it('throws with non-object', () => {
    const obj: any = 4;
    expect(() => objectValues(obj)).toThrowErrorMatchingSnapshot();
  });
});

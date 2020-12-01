import { getSize } from 'iter-tools-es';

describe('getSize', () => {
  it('can get the size of a nullish value', () => {
    expect(getSize(null)).toBe(0);
    expect(getSize(undefined)).toBe(0);
  });

  it('can get the size of an array', () => {
    expect(getSize([1, 2, 3])).toBe(3);
  });

  it('can get the size of an object with a size property', () => {
    expect(getSize(new Set([1, 2, 3]))).toBe(3);
  });

  it('throws when the object does not have a size', () => {
    const sequence: any = {};
    expect(() => getSize(sequence)).toThrowErrorMatchingSnapshot();
  });
});

import { nullOr, arrayFrom } from '../../..';

describe('nullOr', () => {
  it('empty array returns null', () => {
    expect(nullOr([])).toEqual(null);
  });

  it('null returns null', () => {
    expect(nullOr(null)).toEqual(null);
  });

  it('iterable returns iterable', () => {
    expect(arrayFrom(nullOr([1, 2, 3]))).toEqual([1, 2, 3]);
  });
});

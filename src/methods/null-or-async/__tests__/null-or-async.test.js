import { nullOrAsync, arrayFromAsync } from '../../..';

describe('nullOrAsync', () => {
  it('empty array returns null', async () => {
    expect(await nullOrAsync([])).toEqual(null);
  });

  it('null returns null', async () => {
    expect(await nullOrAsync(null)).toEqual(null);
  });

  it('iterable returns iterable', async () => {
    expect(await arrayFromAsync(await nullOrAsync([1, 2, 3]))).toEqual([1, 2, 3]);
  });
});

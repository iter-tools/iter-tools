import { values } from '../../..';

describe('values', () => {
  it('works with Objects', () => {
    const i = values({ '1': 1, '2': 2 });
    expect(Array.from(i)).toEqual([1, 2]);
  });

  it('can be reused', () => {
    const i = values({ '1': 1, '2': 2 });
    expect(Array.from(i)).toEqual([1, 2]);
    expect(Array.from(i)).toEqual([1, 2]);
  });

  it('works with null', () => {
    const i = values(null);
    expect(Array.from(i)).toEqual([]);
  });
});

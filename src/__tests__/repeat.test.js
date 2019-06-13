import { repeat } from '..';

describe('repeat', () => {
  it('return simple repeat', () => {
    expect(Array.from(repeat(10, 3))).toEqual([10, 10, 10]);
  });

  it('can be reused', () => {
    const myRepeat = repeat(10, 3);
    expect(Array.from(myRepeat)).toEqual([10, 10, 10]);
    expect(Array.from(myRepeat)).toEqual([10, 10, 10]);
  });

  it('return infinite repeat', () => {
    const iterable = repeat(10);
    const iter = iterable[Symbol.iterator]();
    expect(iter.next().value).toBe(10);
    expect(iter.next().value).toBe(10);
    expect(iter.next().value).toBe(10);
    expect(iter.next().value).toBe(10);
  });
});

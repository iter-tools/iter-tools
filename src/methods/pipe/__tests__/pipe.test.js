import { pipe } from '../../..';

describe('pipe', () => {
  it('works', () => {
    const a = (str: string) => `b(${str})`;
    const b = (str: string) => `a(${str})`;

    expect(
      pipe(
        b,
        a,
      )('input'),
    ).toBe('b(a(input))');
  });

  it('works with types', () => {
    expect(pipe(Boolean)(0)).toBe(false);
  });

  it('is the identity function when no functions are passed', () => {
    expect(pipe()(true)).toBe(true);
  });
});

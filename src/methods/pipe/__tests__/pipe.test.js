import { pipe } from '../../..';

describe('pipe', () => {
  it('works', () => {
    const a = (str: string) => `a(${str})`;
    const b = (str: string) => `b(${str})`;

    expect(
      pipe(
        a,
        b,
      )('input'),
    ).toBe('b(a(input))');
  });

  it('works with types', () => {
    expect(
      pipe(
        (v: string): number => Number(v),
        (v: number): boolean => Boolean(v),
      )(''),
    ).toBe(false);
  });

  it('is the identity function when no functions are passed', () => {
    expect(pipe()(true)).toBe(true);
  });
});

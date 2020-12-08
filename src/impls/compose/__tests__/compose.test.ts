import { compose } from 'iter-tools-es';

describe('compose', () => {
  it('works', () => {
    const a = (str: string) => `a(${str})`;
    const b = (str: string) => `b(${str})`;

    expect(compose(a, b)('input')).toBe('a(b(input))');
  });

  it('works with types', () => {
    expect(
      compose(
        (v: number): boolean => Boolean(v),
        (v: string): number => Number(v),
      )(''),
    ).toBe(false);
  });

  it('is the identity function when no functions are passed', () => {
    expect(compose()(true)).toBe(true);
  });
});

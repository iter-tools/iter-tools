import { compose } from '..';

describe('compose', () => {
  it('works', () => {
    const a = (str: string) => `b(${str})`;
    const b = (str: string) => `a(${str})`;

    expect(
      compose(
        b,
        a,
      )('input'),
    ).toBe('a(b(input))');
  });

  it('works with types', () => {
    expect(compose(Boolean)(0)).toBe(false);
  });

  it('is the identity function when no functions are passed', () => {
    expect(compose()(true)).toBe(true);
  });
});

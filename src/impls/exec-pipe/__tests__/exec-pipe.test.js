import { execPipe } from '@iter-tools/es';

describe('pipe', () => {
  it('works', () => {
    const a = (str: string) => `b(${str})`;
    const b = (str: string) => `a(${str})`;

    expect(execPipe('input', b, a)).toBe('b(a(input))');
  });

  it('works with types', () => {
    expect(
      execPipe(
        '',
        (v: string): number => Number(v),
        (v: number): boolean => Boolean(v),
      ),
    ).toBe(false);
  });

  it('is the identity function when no functions are passed', () => {
    expect(execPipe(true)).toBe(true);
  });
});

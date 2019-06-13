import { curry } from '../curry';

describe('curry', () => {
  it('curries', () => {
    const f = curry((a, b, c) => a + b + c);
    expect(f(1)(2)(3)).toBe(6);
    expect(f(1, 2)(3)).toBe(6);
    expect(f(1, 2, 3)).toBe(6);
  });

  it('works with empty invocation', () => {
    const f = curry((a, b, c) => a + b + c);
    expect(f()()(1)(2)(3)).toBe(6);
  });

  it('works with function with 0 arity', () => {
    const f = curry(() => 4);
    expect(f()).toBe(4);
  });
});

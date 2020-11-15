import { factorial } from '../factorial';

describe('factorial', () => {
  it('returns the factorial of a number', () => {
    expect(factorial(0)).toEqual(1);
    expect(factorial(1)).toEqual(1);
    expect(factorial(2)).toEqual(2);
    expect(factorial(3)).toEqual(6);
  });

  describe('with to argument', () => {
    it('returns factorial(n) / factorial(to)', () => {
      expect(factorial(6, 3)).toEqual(120);
    });
  });
});

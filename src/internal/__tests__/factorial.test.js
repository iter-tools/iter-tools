import factorial from '../factorial';

describe('factorial', () => {
  it('0', () => {
    expect(Number(factorial(0))).toEqual(1);
  });
  it('1', () => {
    expect(Number(factorial(1))).toEqual(1);
  });
  it('2', () => {
    expect(Number(factorial(2))).toEqual(2);
  });
  it('3', () => {
    expect(Number(factorial(3))).toEqual(6);
  });
});

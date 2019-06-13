import {
  factorial,
  permutationsSize,
  combinationsSize,
  combinationsWithReplacementSize,
} from '../math';

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

describe('permutationsSize', () => {
  it('small', () => {
    expect(permutationsSize(10, 2)).toEqual(90);
  });
  it('big', () => {
    expect(permutationsSize(1000, 4)).toEqual(994010994000); // NaN using doubles
  });
});

describe('combinationsSize', () => {
  it('small', () => {
    expect(combinationsSize(10, 2)).toEqual(45);
  });
  it('big', () => {
    expect(combinationsSize(1000, 4)).toEqual(41417124750); // NaN using doubles
  });
});

describe('combinationsWithReplacementSize', () => {
  it('small', () => {
    expect(combinationsWithReplacementSize(10, 2)).toEqual(55);
  });
  it('big', () => {
    expect(combinationsWithReplacementSize(1000, 4)).toEqual(41917125250); // NaN using doubles
  });
});

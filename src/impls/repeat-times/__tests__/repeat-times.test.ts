import { repeatTimes } from 'iter-tools-es';

describe('repeatTimes', () => {
  it('repeats a value n times', () => {
    expect(Array.from(repeatTimes(3, 'x'))).toEqual(['x', 'x', 'x']);
  });

  it('can be reused', () => {
    const myRepeat = repeatTimes(3, 'x');
    expect(Array.from(myRepeat)).toEqual(['x', 'x', 'x']);
    expect(Array.from(myRepeat)).toEqual(['x', 'x', 'x']);
  });
});

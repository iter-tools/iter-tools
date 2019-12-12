import { repeat, slice } from '../../..';

describe('repeat', () => {
  it('repeats infinitely', () => {
    expect(Array.from(slice(0, 4, repeat('x')))).toEqual(['x', 'x', 'x', 'x']);
  });
});

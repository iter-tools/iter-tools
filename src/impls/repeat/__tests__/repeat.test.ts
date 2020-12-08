import { repeat, slice } from 'iter-tools-es';

describe('repeat', () => {
  it('repeats infinitely', () => {
    expect(Array.from(slice(0, 4, repeat('x')))).toEqual(['x', 'x', 'x', 'x']);
  });
});

import CircularBuffer from '../circular-buffer';

describe('circularArray', () => {
  it('is iterable', () => {
    const a = new CircularBuffer(3);
    a.push(1);
    a.push(2);
    a.push(3);
    a.push(4);
    a.push(5);
    expect(Array.from(a)).toEqual([3, 4, 5]);
  });

  it('mixes write and read', () => {
    const a = new CircularBuffer(3);
    a.push(1);
    a.push(2);
    a.push(3);
    expect(a.push(4)).toBe(1);
    expect(a.push(5)).toBe(2);
    expect(a.push(6)).toBe(3);
    expect(a.push(7)).toBe(4);
    expect(a.push(8)).toBe(5);
    expect(a.push(9)).toBe(6);
  });
});

import { CircularBuffer, ReadOnlyCircularBuffer } from '../circular-buffer';

describe('CircularBuffer', () => {
  it('is iterable', () => {
    const b = new CircularBuffer(3);
    b.push(1);
    b.push(2);
    b.push(3);
    expect(Array.from(b)).toEqual([1, 2, 3]);
    b.push(4);
    b.push(5);
    expect(Array.from(b)).toEqual([3, 4, 5]);
  });

  it('can shift', () => {
    const b = new CircularBuffer(2);
    b.push(1);
    b.push(2);
    expect(b.shift()).toBe(1);
    expect(b.shift()).toBe(2);
    expect(b.shift()).toBe(undefined);
  });

  it('mixes write and read', () => {
    const b = new CircularBuffer(3);
    b.push(1);
    b.push(2);
    b.push(3);
    expect(b.push(4)).toBe(1);
    expect(b.push(5)).toBe(2);
    expect(b.push(6)).toBe(3);
    expect(b.push(7)).toBe(4);
    expect(b.push(8)).toBe(5);
    expect(b.push(9)).toBe(6);
  });

  it('can get items', () => {
    const b = new CircularBuffer(3);
    b.push(0);
    b.push(1);
    expect(b.get(0)).toBe(0);
    expect(b.get(1)).toBe(1);
  });

  it('has size property', () => {
    const b = new CircularBuffer(2);
    expect(b.size).toBe(0);
    b.push(1);
    expect(b.size).toBe(1);
    b.push(2);
    expect(b.size).toBe(2);
    b.push(3);
    expect(b.size).toBe(2);
  });

  it('has isFull method', () => {
    const b = new CircularBuffer(2);
    expect(b.isFull()).toBe(false);
    b.push(1);
    expect(b.isFull()).toBe(false);
    b.push(2);
    expect(b.isFull()).toBe(true);
    b.push(3);
    expect(b.isFull()).toBe(true);
    b.shift();
    expect(b.isFull()).toBe(false);
  });

  it('can get the next item to be shifted with peek', () => {
    const b = new CircularBuffer(2);
    expect(b.peek()).toBe(undefined);
    b.push(1);
    expect(b.peek()).toBe(1);
    b.push(2);
    expect(b.peek()).toBe(1);
    b.push(3);
    expect(b.peek()).toBe(2);
    b.shift();
    expect(b.peek()).toBe(3);
  });

  it('has capacity property', () => {
    const b = new CircularBuffer(2);
    expect(b.capacity).toBe(2);
  });
});

describe('ReadOnlyCircularBuffer', () => {
  it('proxies a circular buffer', () => {
    const b = new CircularBuffer(2);
    const rb = new ReadOnlyCircularBuffer(b);

    expect(rb.capacity).toBe(2);
    expect(rb.size).toBe(0);
    expect(rb.isFull()).toBe(false);
    expect(rb.peek()).toBe(undefined);
    expect(Array.from(rb)).toEqual([]);

    b.push(1);
    b.push(2);

    expect(rb.capacity).toBe(2);
    expect(rb.size).toBe(2);
    expect(rb.get(0)).toBe(1);
    expect(rb.get(1)).toBe(2);
    expect(rb.isFull()).toBe(true);
    expect(rb.peek()).toBe(1);
    expect(Array.from(rb)).toEqual([1, 2]);

    b.push(3);

    expect(rb.peek()).toBe(2);
    expect(Array.from(rb)).toEqual([2, 3]);
  });
});

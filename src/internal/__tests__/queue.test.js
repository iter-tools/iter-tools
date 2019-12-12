import { Queue } from '../queue';

describe('Queue', () => {
  it('queues', () => {
    const queue = new Queue();
    queue.push(1);
    queue.push(2);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.shift()).toBe(1);
    expect(queue.shift()).toBe(2);
    expect(queue.isEmpty()).toBe(true);
    queue.push(3);
    expect(queue.shift()).toBe(3);
  });
});

import { Queue, Exchange } from '../queues';

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

describe('Exchange', () => {
  it('works while open', () => {
    const exchange = new Exchange();
    const consumer1 = exchange.spawnConsumerAtRoot();
    exchange.push(1);
    exchange.push(2);
    const consumer2 = exchange.spawnConsumerAtRoot();
    const consumer3 = exchange.spawnConsumerAtRoot();
    exchange.push(3);

    expect(consumer1.isEmpty()).toBe(false);
    expect(consumer2.isEmpty()).toBe(false);
    expect(consumer3.isEmpty()).toBe(false);

    expect(consumer1.shift()).toBe(1);
    expect(consumer1.shift()).toBe(2);
    expect(consumer1.shift()).toBe(3);
    expect(consumer1.isEmpty()).toBe(true);

    expect(consumer2.shift()).toBe(1);
    expect(consumer3.shift()).toBe(1);
    expect(consumer2.shift()).toBe(2);
    expect(consumer3.shift()).toBe(2);
    expect(consumer2.shift()).toBe(3);
    expect(consumer3.shift()).toBe(3);
    expect(consumer2.isEmpty()).toBe(true);
    expect(consumer3.isEmpty()).toBe(true);

    exchange.push(4);

    expect(consumer1.isEmpty()).toBe(false);
    expect(consumer2.isEmpty()).toBe(false);
    expect(consumer3.isEmpty()).toBe(false);

    expect(consumer1.shift()).toBe(4);
    expect(consumer2.shift()).toBe(4);
    expect(consumer3.shift()).toBe(4);
  });

  it('works after closed', () => {
    const exchange = new Exchange();
    const consumer1 = exchange.spawnConsumerAtRoot();
    exchange.push(1);
    exchange.push(2);
    const consumer2 = exchange.spawnConsumerAtRoot();
    exchange.push(3);

    expect(consumer1.isEmpty()).toBe(false);
    expect(consumer2.isEmpty()).toBe(false);

    expect(consumer1.shift()).toBe(1);
    expect(consumer1.shift()).toBe(2);
    expect(consumer1.shift()).toBe(3);
    expect(consumer1.isEmpty()).toBe(true);

    expect(consumer2.shift()).toBe(1);
    expect(consumer2.shift()).toBe(2);
    expect(consumer2.shift()).toBe(3);
    expect(consumer2.isEmpty()).toBe(true);

    exchange.push(4);

    expect(consumer1.isEmpty()).toBe(false);
    expect(consumer2.isEmpty()).toBe(false);

    expect(consumer1.shift()).toBe(4);
    expect(consumer2.shift()).toBe(4);
  });
});

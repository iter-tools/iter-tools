/* eslint-env node, jest */
const { Queue, Exchange } = require('iter-tools/internal/queues')

describe('Queue', () => {
  it('queues', () => {
    const queue = new Queue()
    queue.push(1)
    queue.push(2)
    expect(queue.isEmpty()).toBe(false)
    expect(queue.shift()).toBe(1)
    expect(queue.shift()).toBe(2)
    expect(queue.isEmpty()).toBe(true)
    queue.push(3)
    expect(queue.shift()).toBe(3)
  })
})

describe('Exchange', () => {
  it('works while open', () => {
    const exchange = new Exchange()
    exchange.push(1)
    const consumer1 = exchange.spawnConsumer()
    exchange.push(2)
    const consumer2 = exchange.spawnConsumer()
    const consumer3 = exchange.spawnConsumer()
    exchange.push(3)

    expect(consumer1.isEmpty()).toBe(false)
    expect(consumer2.isEmpty()).toBe(false)
    expect(consumer3.isEmpty()).toBe(false)

    expect(consumer1.shift()).toBe(1)
    expect(consumer1.shift()).toBe(2)
    expect(consumer1.shift()).toBe(3)
    expect(consumer1.isEmpty()).toBe(true)

    expect(consumer2.shift()).toBe(1)
    expect(consumer3.shift()).toBe(1)
    expect(consumer2.shift()).toBe(2)
    expect(consumer3.shift()).toBe(2)
    expect(consumer2.shift()).toBe(3)
    expect(consumer3.shift()).toBe(3)
    expect(consumer2.isEmpty()).toBe(true)
    expect(consumer3.isEmpty()).toBe(true)

    exchange.push(4)

    expect(consumer1.isEmpty()).toBe(false)
    expect(consumer2.isEmpty()).toBe(false)
    expect(consumer3.isEmpty()).toBe(false)

    expect(consumer1.shift()).toBe(4)
    expect(consumer2.shift()).toBe(4)
    expect(consumer3.shift()).toBe(4)
  })

  it('works after closed', () => {
    const exchange = new Exchange()
    exchange.push(1)
    const consumer1 = exchange.spawnConsumer()
    exchange.push(2)
    const consumer2 = exchange.spawnConsumer()
    exchange.noMoreConsumers()
    exchange.push(3)

    expect(consumer1.isEmpty()).toBe(false)
    expect(consumer2.isEmpty()).toBe(false)

    expect(consumer1.shift()).toBe(1)
    expect(consumer1.shift()).toBe(2)
    expect(consumer1.shift()).toBe(3)
    expect(consumer1.isEmpty()).toBe(true)

    expect(consumer2.shift()).toBe(1)
    expect(consumer2.shift()).toBe(2)
    expect(consumer2.shift()).toBe(3)
    expect(consumer2.isEmpty()).toBe(true)

    exchange.push(4)

    expect(consumer1.isEmpty()).toBe(false)
    expect(consumer2.isEmpty()).toBe(false)

    expect(consumer1.shift()).toBe(4)
    expect(consumer2.shift()).toBe(4)
  })
})

/* eslint-env node, jest */
const MessageQueue = require('iter-tools/internal/message-queue')

describe('MessageQueue', function () {
  it('works while open', async function () {
    const messageQueue = new MessageQueue()
    messageQueue.add(1)
    const consumer1 = messageQueue.spawnConsumer()
    messageQueue.add(2)
    const consumer2 = messageQueue.spawnConsumer()
    const consumer3 = messageQueue.spawnConsumer()
    messageQueue.add(3)

    expect(consumer1.isExhausted()).toBe(false)
    expect(consumer2.isExhausted()).toBe(false)
    expect(consumer3.isExhausted()).toBe(false)

    expect(consumer1.get()).toBe(1)
    expect(consumer1.get()).toBe(2)
    expect(consumer1.get()).toBe(3)
    expect(consumer1.isExhausted()).toBe(true)

    expect(consumer2.get()).toBe(1)
    expect(consumer3.get()).toBe(1)
    expect(consumer2.get()).toBe(2)
    expect(consumer3.get()).toBe(2)
    expect(consumer2.get()).toBe(3)
    expect(consumer3.get()).toBe(3)
    expect(consumer2.isExhausted()).toBe(true)
    expect(consumer3.isExhausted()).toBe(true)

    messageQueue.add(4)

    expect(consumer1.isExhausted()).toBe(false)
    expect(consumer2.isExhausted()).toBe(false)
    expect(consumer3.isExhausted()).toBe(false)

    expect(consumer1.get()).toBe(4)
    expect(consumer2.get()).toBe(4)
    expect(consumer3.get()).toBe(4)
  })

  it('works after closed', async function () {
    const messageQueue = new MessageQueue()
    messageQueue.add(1)
    const consumer1 = messageQueue.spawnConsumer()
    messageQueue.add(2)
    const consumer2 = messageQueue.spawnConsumer()
    messageQueue.close()
    messageQueue.add(3)

    expect(consumer1.isExhausted()).toBe(false)
    expect(consumer2.isExhausted()).toBe(false)

    expect(consumer1.get()).toBe(1)
    expect(consumer1.get()).toBe(2)
    expect(consumer1.get()).toBe(3)
    expect(consumer1.isExhausted()).toBe(true)

    expect(consumer2.get()).toBe(1)
    expect(consumer2.get()).toBe(2)
    expect(consumer2.get()).toBe(3)
    expect(consumer2.isExhausted()).toBe(true)

    messageQueue.add(4)

    expect(consumer1.isExhausted()).toBe(false)
    expect(consumer2.isExhausted()).toBe(false)

    expect(consumer1.get()).toBe(4)
    expect(consumer2.get()).toBe(4)
  })
})

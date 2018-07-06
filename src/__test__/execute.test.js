/* eslint-env node, jest */
const { execute, asyncExecute } = require('iter-tools')

describe('execute', function () {
  it('execute forever', function () {
    const iter = execute(function () { return 1 })
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(1)
    expect(iter.next().value).toBe(1)
  })
})

describe('asyncExecute', function () {
  it('execute forever', async function () {
    const iter = asyncExecute(() => Promise.resolve(1))
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
    expect(await iter.next()).toEqual({ value: 1, done: false })
  })
})

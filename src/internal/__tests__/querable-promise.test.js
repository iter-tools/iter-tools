/* eslint-env node, jest */
const querablePromise = require('../querable-promise')
const delay = require('../delay')

describe('querablePromise', function () {
  it('wrap promise and adds methods (fulfilled)', async function () {
    const tenMs = querablePromise(delay(10, 'done'))
    expect(tenMs.isPending()).toBe(true)
    const result = await tenMs
    expect(tenMs.isFulfilled()).toBe(true)
    expect(result).toBe('done')
  })

  it('wrap promise and adds methods (rejected)', async function () {
    const tenMs = querablePromise(delay(10, new Error('oh no')))
    expect(tenMs.isPending()).toBe(true)
    try {
      await tenMs
      throw new Error('assertion error')
    } catch (e) {
      expect(e.message).toBe('oh no')
      expect(tenMs.isRejected()).toBe(true)
    }
  })
})

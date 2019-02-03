/* eslint-env node, jest */
const delay = require('../delay')

describe('delay', function () {
  it('delay (fulfilled)', async function () {
    const tenMs = delay(10, 'done')
    const result = await tenMs
    expect(result).toBe('done')
  })

  it('delay (rejected)', async function () {
    const tenMs = delay(10, new Error('oh no'))
    try {
      await tenMs
      throw new Error('assertion error')
    } catch (e) {
      expect(e.message).toBe('oh no')
    }
  })
})

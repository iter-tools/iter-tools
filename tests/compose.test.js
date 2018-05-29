/* eslint-env node, mocha */
const assert = require('chai').assert
const compose = require('../dist/compose')
const filter = require('../dist/filter')
const map = require('../dist/map')

function power2 (x) {
  return x * x
}

function isEven (x) {
  return (x % 2) === 0
}

describe('compose', function () {
  it('composes iterables', function () {
    const iter = compose([map(power2), filter(isEven), map(power2)])
    assert.deepEqual(Array.from(iter([1, 2, 3, 4])), [16, 256])
  })
})

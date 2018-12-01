/* eslint-env node, jest */
const { when } = require('iter-tools')

describe('when', function () {
  describe('when().add()', function () {
    let item = 'foo'

    it('emits the added item when condition is truthy', function () {
      expect(Array.from(when(4).add(item))).toEqual([item])
    })

    it('emits nothing when condition is falsy', function () {
      expect(Array.from(when(null).add(item))).toEqual([])
    })
  })

  describe('when().concat()', function () {
    let items = ['foo', 'bar']

    it('emits the concatted items when condition is truthy', function () {
      expect(Array.from(when(true).concat(items))).toEqual(items)
    })

    it('emits nothing when condition is falsy', function () {
      expect(Array.from(when(false).concat(items))).toEqual([])
    })
  })

  describe('when().assign()', function () {
    let obj = {foo: 'foo', bar: 'bar'}

    it('emits the added item when condition is truthy', function () {
      expect({...when('true').assign(obj)}).toEqual(obj)
    })

    it('emits nothing when condition is falsy', function () {
      expect({...when(undefined).assign(obj)}).toEqual({})
    })
  })
})

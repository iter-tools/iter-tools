/* eslint-env node, jest */
const { regexpSplit } = require('..')

describe('regexpSplit', function () {
  it('should split with global re', function () {
    const re = /\s+/g
    const iter = regexpSplit(re, 'ab s   d')
    expect(Array.from(iter)).toEqual('ab s   d'.split(re))
  })
  it('can be curried', function () {
    const re = /\s+/g
    const splitter = regexpSplit(re)
    const iter1 = splitter('ab s   d')
    expect(Array.from(iter1)).toEqual('ab s   d'.split(/\s+/g))
    const iter2 = splitter(' xx xx')
    expect(Array.from(iter2)).toEqual(' xx xx'.split(/\s+/g))
  })
  it('should split with global re (2)', function () {
    const re = /\s+/g
    const iter = regexpSplit(re, 'ab s   d  ')
    expect(Array.from(iter)).toEqual('ab s   d  '.split(/\s+/g))
  })
  it('should split (nothing to split)', function () {
    const re = /\s+/g
    const iter = regexpSplit(re, 'absd')
    expect(Array.from(iter)).toEqual('absd'.split(re))
  })
  it('should split with non global re', function () {
    const re = /\s+/
    const iter = regexpSplit(re, 'ab s   d')
    expect(Array.from(iter)).toEqual('ab s   d'.split(/\s+/))
  })
  it('should split with string', function () {
    const re = ' '
    const iter = regexpSplit(re, 'ab s d')
    expect(Array.from(iter)).toEqual('ab s d'.split(' '))
  })
  it('should split with empty string', function () {
    const re = ''
    const iter = regexpSplit(re, 'abc')
    expect(Array.from(iter)).toEqual('abc'.split(''))
  })
})

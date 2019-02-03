/* eslint-env node, jest */
const { regexpExec } = require('..')

describe('regexpExec', function () {
  it('should find matches', function () {
    const re = /[0-9]{4}/
    const iter = regexpExec(re, '10/2/2013, 03/03/2015 12/4/1997')
    const results = []
    for (let [i] of iter) {
      results.push(i)
    }
    expect(results).toEqual(['2013', '2015', '1997'])
  })

  it('can be curried', function () {
    const re = /[0-9]{4}/
    const iter = regexpExec(re)
    const results = []
    for (let [i] of iter('10/2/2013, 03/03/2015 12/4/1997')) {
      results.push(i)
    }
    expect(results).toEqual(['2013', '2015', '1997'])
  })
})

const cloneRegexp = require('clone-regexp')

function regexpSplit (re, str) {
  if (re && typeof re === 'string') {
    re = new RegExp(re, 'g')
  }
  if (re && !re.global) {
    re = cloneRegexp(re, { global: true })
  }
  function * iter (str) {
    let i, match
    if (!re) {
      yield * str
      return
    }
    for (i = 0; match = re.exec(str); i = re.lastIndex) { // eslint-disable-line no-cond-assign
      yield str.slice(i, re.lastIndex - match[0].length)
      if (!re.global) break
    }
    yield str.slice(i)
  }
  if (typeof str === 'undefined') {
    return iter
  }
  return iter(str)
}

module.exports = regexpSplit

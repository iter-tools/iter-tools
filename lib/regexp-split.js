const cloneRegexp = require('clone-regexp')

function regexpSplit (re, str) {
  if (re && typeof re === 'string') {
    re = new RegExp(re, 'g')
  }
  if (re && !re.global) {
    re = cloneRegexp(re, {global: true})
  }
  function * iter (str) {
    let i
    if (!re) {
      yield * str
      return
    }
    for (i = 0; re.test(str); i = re.lastIndex) {
      yield str.slice(i, re.lastIndex - RegExp.lastMatch.length)
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

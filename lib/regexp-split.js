const cloneRegexp = require('clone-regexp')

function regexpSplit (re, options, str) {
  if (typeof options === 'undefined' || options.constructor !== Object) {
    str = options
    options = {}
  }
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
    for (i = 0; match = re.exec(str); i = re.lastIndex) {
      lastMatchLength = options.includeMatch ? 0 : match[0].length
      if (options.includeMatch && i === re.lastIndex) continue
      yield str.slice(i, re.lastIndex - lastMatchLength)
      if (!re.global) break
    }
    // if (!options.includeMatch && str.length !== i) {
    yield str.slice(i)
    // }
  }
  if (typeof str === 'undefined') {
    return iter
  }
  return iter(str)
}

module.exports = regexpSplit

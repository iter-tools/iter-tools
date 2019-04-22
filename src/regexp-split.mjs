import { cloneRegexp, isRegExp } from './internal/regexp'
import { curry } from './internal/curry'

function regexpSplit (re, str) {
  return {
    * [Symbol.iterator] () {
      if (typeof str !== 'string') throw new Error('regexpSplit: the second argument should be a string')

      if (!re) {
        yield * str
        return
      }

      if (typeof re === 'string') {
        re = new RegExp(re, 'g')
      }

      if (!isRegExp(re)) throw new Error('regexpSplit: the first argument can be a string or a regular expression')

      if (re && !re.global) {
        re = cloneRegexp(re, { global: true })
      }

      let i, match
      for (i = 0; match = re.exec(str); i = re.lastIndex) { // eslint-disable-line no-cond-assign
        const part = str.slice(i, re.lastIndex - match[0].length)
        yield part
        if (i === 0 && re.lastIndex === 0 && match[0].length === 0) break
        if (!re.global) break
      }
      yield str.slice(i)
    }
  }
}

export default curry(regexpSplit)

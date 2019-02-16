import { cloneRegexp, isRegExp } from './internal/regexp'
import { curry } from './internal/curry'

function * regexpExec (re, str) {
  if (typeof re === 'string') {
    re = new RegExp(re, 'g')
  }

  if (!isRegExp(re)) throw new Error('regexpExec: the first argument can be a string or a regular expression')

  if (!re.sticky && !re.global) {
    re = cloneRegexp(re, { global: true })
  }

  if (typeof str !== 'string') throw new Error('regexpExec: the second argument should be a string')
  let match
  while ((match = re.exec(str)) !== null) {
    yield match
  }
}

export default curry(regexpExec)

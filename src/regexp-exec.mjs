import cloneRegexp from './internal/clone-regexp'

function * regexpExec (re, str) {
  if (typeof str !== 'string') throw new Error('regexpExec: it should take a string')
  let match
  while ((match = re.exec(str)) !== null) {
    yield match
  }
}

export default function curriedRegexpExec (re, str) {
  if (!re) {
    throw new Error('A RegExp string or instance must be passed to regexpExec.')
  }

  if (typeof re === 'string') {
    re = new RegExp(re, 'g')
  } else if (!re.sticky && !re.global) {
    re = cloneRegexp(re, { global: true })
  }

  if (arguments.length === 1) {
    return str => regexpExec(re, str)
  }
  return regexpExec(re, str)
}

export default function regexpExec (re, str) {
  function * iter (str) {
    let match
    while ((match = re.exec(str)) !== null) {
      yield match
      if (!re.global) return
    }
  }
  if (typeof str === 'undefined') {
    return iter
  }
  return iter(str)
}

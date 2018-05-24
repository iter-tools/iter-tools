const regexSplit = require('./regexp-split')

function regexpSplitIter (re, iterable) {
  function * _regexpSplitIter (iterable) {
    let buffer = ''
    let queue
    let mergeEmpty = false
    for (const chunk of iterable) {
      if (chunk === '') continue
      queue = []
      buffer += chunk
      for (const strIter of regexSplit(re, buffer)) {
        if (mergeEmpty && strIter === '') {
          mergeEmpty = false
          continue
        }
        mergeEmpty = false
        queue.push(strIter)
        if (queue.length === 2) {
          yield queue.shift()
        }
      }
      mergeEmpty = queue[queue.length - 1] === ''
      buffer = queue.join('')
    }
    if (queue && queue.length) {
      yield * queue
    }
  }
  if (typeof iterable === 'undefined') {
    return _regexpSplitIter
  }
  return _regexpSplitIter(iterable)
}

module.exports = regexpSplitIter

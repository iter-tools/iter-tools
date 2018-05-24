const regexSplit = require('./regexp-split')

function regexpSplitIter (re, options, iterable) {
  if (typeof options === 'undefined' || options.constructor !== Object) {
    iterable = options
    options = {}
  }
  function * iter (iterable) {
    let buffer = ''
    let queue
    let mergeEmpty = false
    for (const chunk of iterable) {
      if (chunk === '') continue
      queue = []
      buffer += chunk
      console.log('buffer', '"' + buffer + '"')
      for (const strIter of regexSplit(re, options, buffer)) {
        if (mergeEmpty && strIter === '') {
          mergeEmpty = false
          continue
        }
        mergeEmpty = false
        queue.push(strIter)
        console.log('queue', queue)
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
    return iter
  }
  return iter(iterable)
}

module.exports = regexpSplitIter

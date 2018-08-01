import ensureAsyncIterable from './internal/ensure-async-iterable'
import regexSplit from './regexp-split'

async function * regexpSplitIter (re, iterable) {
  let buffer = ''
  let queue
  let mergeEmpty = false
  for await (const chunk of ensureAsyncIterable(iterable)) {
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

export default function curriedRegexpSplitIter (re, iterable) {
  if (arguments.length === 1) {
    return iterable => regexpSplitIter(re, iterable)
  }
  return regexpSplitIter(re, iterable)
}

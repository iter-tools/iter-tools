import curry from './internal/curry'
import merge, { mergeByPosition } from './merge'
import consume from './consume'

function consumeMany (func, iterableOfIterables) {
  consume(func, merge(mergeByPosition(), iterableOfIterables))
}

export default curry(consumeMany)

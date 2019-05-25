import { $async, $await } from './macros/async.macro'

$async; function * execute (func, ...args) {
  while (true) {
    yield $await(func(...args))
  }
}

export default execute

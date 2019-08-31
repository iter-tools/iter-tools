import { $async, $await } from '../../../generate/async.macro';
import { $wrapWithMethodIterable } from '../../internal/$iterable';

$async;
export function* $execute(func, ...args) {
  while (true) {
    yield $await(func(...args));
  }
}

export default $wrapWithMethodIterable($execute);

import { $async, $await } from '../generate/async.macro';

$async;
function* $execute(func, ...args) {
  while (true) {
    yield $await(func(...args));
  }
}

export default $execute;

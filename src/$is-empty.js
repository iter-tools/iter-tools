import { $async, $await } from '../generate/async.macro';
import $firstOr from './$first-or';

const NONE = {};

$async;
function $isEmpty(iterable) {
  return $await($firstOr(NONE, iterable)) === NONE;
}

export default $isEmpty;
